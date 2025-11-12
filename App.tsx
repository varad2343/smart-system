import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import { BellIcon } from './components/icons';
import { View, Task, Status, Priority } from './types';
import TaskModal from './components/TaskModal';
import NotificationPanel from './components/NotificationPanel';

// Lazy load the view components
const Dashboard = lazy(() => import('./components/views/Dashboard'));
const TaskView = lazy(() => import('./components/views/TaskView'));
const ScheduleView = lazy(() => import('./components/views/ScheduleView'));
const TaskBreakdownView = lazy(() => import('./components/views/TaskBreakdownView'));
const TaskReallocateView = lazy(() => import('./components/views/TaskReallocateView'));

const LoadingSpinner: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
     const localTasks = localStorage.getItem('smart-task-scheduler-tasks');
     // Start with stored tasks when available. Default to an empty list so no sample/demo tasks are present.
     return localTasks ? JSON.parse(localTasks) : [];
    } catch(e) {
        return [];
    }
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);

  useEffect(() => {
    localStorage.setItem('smart-task-scheduler-tasks', JSON.stringify(tasks));
    
    const now = new Date();
    const twentyFourHoursFromNow = now.getTime() + 24 * 60 * 60 * 1000;

    const upcoming = tasks.filter(task => {
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      if (task.dueTime) {
        const [hours, minutes] = task.dueTime.split(':');
        due.setHours(parseInt(hours, 10));
        due.setMinutes(parseInt(minutes, 10));
      }
      const dueTime = due.getTime();
      return dueTime > now.getTime() && dueTime < twentyFourHoursFromNow;
    });

    setUpcomingTasks(upcoming);
    setHasNotifications(upcoming.length > 0);

  }, [tasks]);

  const handleOpenModal = (task?: Task) => {
    setTaskToEdit(task || null);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleSaveTask = (task: Task) => {
    const taskIndex = tasks.findIndex(t => t.id === task.id);
    if (taskIndex > -1) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    } else {
      setTasks([...tasks, task]);
    }
    handleCloseModal();
  };
  
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    handleCloseModal();
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard tasks={tasks} />;
      case 'tasks':
        return <TaskView tasks={tasks} setTasks={setTasks} openModal={handleOpenModal} />;
      case 'schedule':
        return <ScheduleView setTasks={setTasks} />;
      case 'breakdown':
        return <TaskBreakdownView setTasks={setTasks} setCurrentView={setCurrentView as (view: 'tasks') => void} />;
      case 'reallocate':
        return <TaskReallocateView tasks={tasks} setTasks={setTasks} setCurrentView={setCurrentView as (view: 'tasks') => void} />;
      default:
        return <Dashboard tasks={tasks} />;
    }
  };

  return (
    <div className="flex h-screen bg-background relative overflow-hidden">
      {/* Desktop sidebar (hidden on small screens). Mobile sidebar is shown via drawer when toggled. */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        hasNotifications={hasNotifications}
        onNotificationClick={() => setIsNotificationPanelOpen(prev => !prev)}
      />

      {isMobileSidebarOpen && (
        <Sidebar
          mobile
          onClose={() => setIsMobileSidebarOpen(false)}
          currentView={currentView}
          setCurrentView={setCurrentView}
          hasNotifications={hasNotifications}
          onNotificationClick={() => { setIsNotificationPanelOpen(prev => !prev); setIsMobileSidebarOpen(false); }}
        />
      )}
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-secondary flex items-center justify-between p-3">
        <button onClick={() => setIsMobileSidebarOpen(true)} className="p-2 text-text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <img src="/logo.png" alt="logo" className="w-8 h-8" />
        <button onClick={() => setIsNotificationPanelOpen(prev => !prev)} className="p-2 text-text-secondary">
          <BellIcon className="w-6 h-6" />
        </button>
      </div>

      <main className="flex-1 md:ml-64 overflow-y-auto p-4 md:p-8 pt-16 md:pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              {renderView()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        taskToEdit={taskToEdit}
      />
      <AnimatePresence>
        {isNotificationPanelOpen && (
          <NotificationPanel 
            upcomingTasks={upcomingTasks}
            onClose={() => setIsNotificationPanelOpen(false)}
          />
        )}
      </AnimatePresence>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        aria-label="Notification container"
      />
    </div>
  );
};

export default App;