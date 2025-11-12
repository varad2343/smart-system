export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum Status {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string;
  dueTime?: string; // Add this line
  notificationEmail?: string; // Add this line
  subTasks?: Task[];
  timeAllocation?: number; // in minutes
}

export interface ScheduleItem {
  time: string;
  activity: string;
  type: 'work' | 'rest';
  duration: number; // in minutes
}

export type View = 'dashboard' | 'tasks' | 'schedule' | 'breakdown' | 'reallocate';

export interface TimeUsageData {
    name: string;
    Work: number;
    Rest: number;
}
