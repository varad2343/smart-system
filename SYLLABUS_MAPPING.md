# DSA Syllabus to Project Files Mapping

This document maps each Data Structures and Algorithms (DSA) syllabus topic to the relevant files in the Smart Task Scheduler project.

---

## Section 1: Fundamental Concepts

### 1. Introduction to Object-Oriented Programming (OOP)

**Topics Covered:** Classes, Objects, Inheritance, Polymorphism, Encapsulation

**Related Files:**
- ✅ `types.ts` - Defines interfaces and enums (TypeScript's approach to OOP)
  - `Task` interface (object contract)
  - `Priority` enum (LOW, MEDIUM, HIGH)
  - `Status` enum (TODO, IN_PROGRESS, DONE)
  - `ScheduleItem` interface
  
- ✅ `components/TaskModal.tsx` - Demonstrates encapsulation
  - Encapsulates task creation/editing logic
  - Internal state management
  - Props-based interface (abstraction)

- ✅ `components/views/*.tsx` - Component-based OOP
  - Each view is a reusable class-like component
  - Props interface defines public API
  - State encapsulation

**Status:** ⚠️ **Partially Implemented** (TypeScript functional components, not classical Java OOP)

**Missing/Suggestions:**
- No classical inheritance hierarchy
- No polymorphic method overriding examples
- **Recommendation:** Create Java classes to demonstrate:
  ```java
  // BaseTask.java (parent class)
  // ScheduledTask.java (inheritance)
  // RecurringTask.java (polymorphism)
  ```

---

### 2. Basic Concepts of Arrays

**Topics Covered:** Definition, Representation, Arithmetic Operations, Traversal, Insertion, Deletion

**Related Files:**

✅ **Core Array Operations:**

- `App.tsx` (Lines 26-62)
  - **Declaration:** `const [tasks, setTasks] = useState<Task[]>(...)`
  - **Traversal:** `tasks.filter(...)` - iterating through array
  - **Insertion:** `setTasks([...tasks, task])` - adding new task
  - **Deletion:** `setTasks(tasks.filter(t => t.id !== taskId))` - removing task
  - **Update:** `setTasks(tasks.map(t => t.id === task.id ? task : t))` - modifying element

- `components/views/TaskView.tsx` (Lines 122-136)
  - **Linear Search:** `tasks.filter(task => task.title.toLowerCase().includes(searchTerm))`
  - **Filtering:** `tasks.filter(task => statusFilter === 'all' || task.status === statusFilter)`
  - **Grouping:** `filteredTasks.reduce((acc, task) => {...})` - array aggregation

- `components/views/Dashboard.tsx` (Lines 24-29)
  - **Reduce Operation:** Count tasks by status
  ```typescript
  const counts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<Status, number>);
  ```

- `components/views/ScheduleView.tsx` (Lines 37-49)
  - **Array Transformation:** Converting schedule items to tasks
  ```typescript
  const newTasks = schedule
    .filter(item => item.type === 'work')
    .map(item => ({...}));
  ```

- `services/geminiService.ts` (Lines 87, 96-98)
  - **Array Mapping:** Transform task objects for AI processing
  ```typescript
  tasks.map(t => ({ title: t.title, status: t.status, priority: t.priority }))
  ```

**Status:** ✅ **Well Implemented**

**Time Complexity Analysis Present:**
- Filter: O(n) - demonstrated in `TaskView.tsx`
- Map: O(n) - used throughout
- Reduce: O(n) - shown in `Dashboard.tsx`
- Find: O(n) - used in `App.tsx`

---

### 3. Sorting Techniques

**Topics Covered:** Bubble Sort, Insertion Sort, Quick Sort, Heap Sort (with time & space complexity)

**Related Files:**
- ❌ **NOT IMPLEMENTED**

**Current Sorting Usage:**
- No explicit sorting algorithm implementations
- Tasks are displayed in insertion order (array order from localStorage)

**Potential Integration Points:**
- `components/views/TaskView.tsx` - Could add sort by priority/due date
- `components/views/Dashboard.tsx` - Could sort tasks for visualization

**Missing/Suggestions:**
- **Recommended Addition:** Create `src/utils/sorting.ts`
  ```typescript
  export function bubbleSort(tasks: Task[], key: keyof Task): Task[]
  export function quickSort(tasks: Task[], key: keyof Task): Task[]
  export function heapSort(tasks: Task[], key: keyof Task): Task[]
  ```
- Add UI controls in `TaskView.tsx` to sort by:
  - Priority (HIGH → LOW)
  - Due Date (earliest first)
  - Status (TODO → IN_PROGRESS → DONE)
- Display time complexity metrics in UI

---

### 4. Searching Techniques

**Topics Covered:** Linear Search, Binary Search (with time complexity analysis)

**Related Files:**

✅ **Linear Search:**

- `components/views/TaskView.tsx` (Lines 122-123)
  ```typescript
  .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
  ```
  - **Implementation:** Sequential scan through array
  - **Time Complexity:** O(n)
  - **Use Case:** Search tasks by title substring

- `App.tsx` (Line 78)
  ```typescript
  const taskIndex = tasks.findIndex(t => t.id === task.id);
  ```
  - **Implementation:** Find by task ID
  - **Time Complexity:** O(n)

❌ **Binary Search:**
- **NOT IMPLEMENTED**
- **Reason:** Arrays are unsorted, binary search not applicable

**Missing/Suggestions:**
- **Recommended Addition:** Create `src/utils/searching.ts`
  ```typescript
  export function binarySearch(
    sortedTasks: Task[], 
    target: string, 
    key: keyof Task
  ): number
  ```
- Add sorted view option where binary search can be demonstrated
- Compare linear vs binary search performance on large datasets

**Status:** ⚠️ **Partially Implemented** (only linear search)

---

### 5. Linked Lists

**Topics Covered:** Dynamic Memory Allocation, Singly Linked Lists, Doubly Linked Lists, Circular Linked Lists

**Related Files:**
- ❌ **NOT IMPLEMENTED**

**Current Approach:**
- Project uses JavaScript arrays (dynamic, contiguous memory)
- No explicit linked list data structures

**Potential Use Cases in Project:**
- Task history/undo-redo chain (doubly linked list)
- Subtask relationships (linked structure)
- Navigation history (circular linked list)

**Missing/Suggestions:**
- **Recommended Addition:** Create `src/datastructures/LinkedList.ts`
  ```typescript
  class Node<T> {
    data: T;
    next: Node<T> | null;
    prev?: Node<T> | null; // for doubly linked
  }
  
  class SinglyLinkedList<T> {
    head: Node<T> | null;
    insert(data: T, position: number): void;
    delete(position: number): void;
    traverse(): T[];
  }
  
  class DoublyLinkedList<T> extends SinglyLinkedList<T> {
    tail: Node<T> | null;
    // ... doubly linked operations
  }
  ```
- **Use Case Example:** Implement task history feature using doubly linked list
- Add "Undo Last Action" using linked list of previous states

**Status:** ❌ **Not Implemented**

---

### 6. Stack

**Topics Covered:** Array/Linked List Implementation, Expression Conversion/Evaluation

**Related Files:**
- ❌ **NOT IMPLEMENTED**

**Potential Use Cases in Project:**
- **Undo/Redo:** Stack of previous task states
- **Navigation:** Browser-like back/forward using two stacks
- **Expression Evaluation:** Could add formula fields in tasks

**Missing/Suggestions:**
- **Recommended Addition:** Create `src/datastructures/Stack.ts`
  ```typescript
  class Stack<T> {
    private items: T[];
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
  }
  ```
- **Application Examples:**
  - `src/utils/expressionEvaluator.ts` - Postfix evaluation
  - `src/utils/parenthesesChecker.ts` - Balanced parentheses
  - Add undo/redo feature in `App.tsx`:
    ```typescript
    const [undoStack, setUndoStack] = useState<Task[][]>([]);
    const [redoStack, setRedoStack] = useState<Task[][]>([]);
    ```

**Status:** ❌ **Not Implemented**

---

### 7. Queues

**Topics Covered:** Array/Linked List Implementation, Types of Queues (Simple, Circular, Priority, Deque)

**Related Files:**
- ❌ **NOT IMPLEMENTED**

**Current Scheduling:**
- Uses AI-based scheduling (`services/geminiService.ts`)
- No explicit queue data structure for task scheduling

**Potential Use Cases:**
- **Priority Queue:** Task scheduling by priority
- **Simple Queue:** Print job scheduling simulation
- **Circular Queue:** Round-robin task processor

**Missing/Suggestions:**
- **Recommended Addition:** Create `src/datastructures/Queue.ts`
  ```typescript
  class Queue<T> {
    private items: T[];
    enqueue(item: T): void;
    dequeue(): T | undefined;
    front(): T | undefined;
  }
  
  class PriorityQueue<T> {
    private heap: { data: T; priority: number }[];
    enqueue(item: T, priority: number): void;
    dequeue(): T | undefined;
  }
  ```
- **Replace AI Scheduling with Algorithmic Approach:**
  - Implement priority queue in `services/scheduler.ts`
  - Use heap for O(log n) insertions
  - Wire to `ScheduleView.tsx` as alternative to AI

**Status:** ❌ **Not Implemented**

---

### 8. Applications of Stack, Queue, and Linked List

#### Stack Applications:

**Topics Covered:** Balancing Parentheses, Reversing String, Postfix Evaluation

**Related Files:**
- ❌ **NOT IMPLEMENTED**

**Suggestions:**
- Create `src/demos/StackApplications.tsx` component with:
  - Parentheses checker for task descriptions
  - String reversal demo
  - Postfix expression calculator (useful for formula fields)

#### Queue Applications:

**Topics Covered:** Ticketing System, Print Job Scheduling, Service Center Simulation

**Related Files:**
- ❌ **NOT IMPLEMENTED**

**Partial Concept Present:**
- `components/views/ScheduleView.tsx` - Scheduling concept (but AI-based, not queue-based)

**Suggestions:**
- Add `src/demos/QueueApplications.tsx`:
  - Simulate task queue processing
  - Print job scheduling visualization
  - Service ticket system for task assignment

#### Linked List Applications:

**Topics Covered:** To-Do List, Phone Directory, Memory Allocator

**Related Files:**
- ⚠️ **Conceptually Related (but using arrays)**

- `components/views/TaskView.tsx` - Manages to-do list (using arrays, not linked list)
- `App.tsx` - Task management (array-based)

**Suggestions:**
- Refactor task storage to use linked list internally
- Add `src/demos/LinkedListApplications.tsx`:
  - Contact directory feature
  - Task history with linked list
  - Memory allocation visualization

---

## Section 2: Advanced Topics

### 9. Trees

**Topics Covered:** Binary Trees, BST, Traversals (Recursive/Non-recursive), Huffman Trees, AVL, Red-Black, B-trees, B+ trees

**Related Files:**
- ❌ **NOT IMPLEMENTED**

**Potential Use Cases:**
- **BST:** Store tasks ordered by due date/priority
- **Huffman:** Compress task descriptions
- **Tree Traversals:** Hierarchical subtask relationships

**Related Concept:**
- `types.ts` - `Task` interface has `subTasks?: Task[]` field (tree-like structure)
- Could be visualized as a tree but no tree algorithms implemented

**Missing/Suggestions:**
- **Recommended Addition:** Create `src/datastructures/Tree.ts`
  ```typescript
  class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
  }
  
  class BinarySearchTree<T> {
    root: TreeNode<T> | null;
    insert(data: T): void;
    search(data: T): TreeNode<T> | null;
    inorder(): T[]; // recursive
    levelOrder(): T[]; // non-recursive (BFS)
  }
  ```
- Add tree visualization component for subtasks
- Implement Huffman encoding for task data compression demo

**Status:** ❌ **Not Implemented**

---

### 10. Graphs

**Topics Covered:** Adjacency Matrix/List, BFS/DFS, Connected Graphs, Bipartite, Cycle Detection, MST (Prim, Kruskal), Shortest Path, Union-Find, TSP

**Related Files:**
- ❌ **NOT IMPLEMENTED**

**HIGHLY RELEVANT Use Case:**
- **Task Dependencies:** Represent tasks as graph nodes, dependencies as edges
- **Cycle Detection:** Prevent circular task dependencies
- **Topological Sort:** Order tasks respecting dependencies
- **Critical Path:** Shortest path for project completion

**Current Limitation:**
- Tasks are independent entities; no dependency modeling

**Missing/Suggestions:**
- **CRITICAL ADDITION for Real Scheduling:** Create `src/datastructures/Graph.ts`
  ```typescript
  class Graph {
    adjacencyList: Map<string, string[]>; // taskId -> dependent taskIds
    
    addEdge(from: string, to: string): void;
    bfs(start: string): string[];
    dfs(start: string): string[];
    hasCycle(): boolean;
    topologicalSort(): string[]; // For task ordering
  }
  ```
- Extend `Task` interface:
  ```typescript
  interface Task {
    // ... existing fields
    dependencies?: string[]; // IDs of tasks that must complete first
  }
  ```
- Add `services/dependencyGraph.ts` to manage task relationships
- Create `components/views/DependencyGraphView.tsx` for visualization

**Status:** ❌ **Not Implemented** (but HIGHLY RECOMMENDED for project enhancement)

---

### 11. Hashing

**Topics Covered:** Hash Tables, Hash Functions, Collision Handling, Dynamic Hashing, Password Encryption, Integrity Checks

**Related Files:**

✅ **Hash Map Usage (JavaScript Map):**

- `components/views/TaskReallocateView.tsx` (Line 53)
  ```typescript
  const reallocatedMap = new Map(reallocated.map(t => [t.id, t.priority]));
  ```
  - **Data Structure:** Hash map for O(1) lookup
  - **Use Case:** Quick priority updates by task ID
  - **Collision Handling:** Built-in (JavaScript Map uses internal hash table)

- `services/notificationStore.ts` (Lines 6-18)
  ```typescript
  type NotificationRecord = {
    [taskId: string]: {
      overdue?: boolean;
      dueSoon?: boolean;
    };
  };
  ```
  - **Data Structure:** Object as hash table (localStorage-backed)
  - **Use Case:** Track notification status by task ID
  - **Key:** `taskId` (string)
  - **Value:** Notification flags object

✅ **Hash Functions (Implicit):**

- `TaskModal.tsx` (Line 51)
  ```typescript
  id: task.id || crypto.randomUUID()
  ```
  - Uses UUID generation (cryptographic hash-based)

- `components/views/TaskBreakdownView.tsx` (Line 42)
  ```typescript
  id: crypto.randomUUID()
  ```
  - Generates unique IDs using hashing

**Password Encryption Example:**
- `services/emailService.ts` - Uses EmailJS with hardcoded keys (not best practice, but demonstrates config storage)

**Status:** ✅ **Implemented** (practical usage, not explicit hash table implementation)

**Missing/Suggestions:**
- No custom hash function implementations
- No collision resolution demonstrations (chaining, open addressing)
- **Recommended Addition:** Create `src/datastructures/HashMap.ts`
  ```typescript
  class HashMap<K, V> {
    private buckets: Array<Array<{key: K, value: V}>>;
    private size: number;
    
    private hash(key: K): number; // Custom hash function
    put(key: K, value: V): void; // Handle collisions
    get(key: K): V | undefined;
    handleCollision(): void; // Chaining or open addressing
  }
  ```
- Add hash function visualization demo
- Demonstrate collision resolution techniques

---

## Summary Tables

### Implementation Status by Category

| Category | Status | Coverage | Files Count |
|----------|--------|----------|-------------|
| **OOP Concepts** | ⚠️ Partial | 40% | 3 files |
| **Arrays** | ✅ Complete | 90% | 6 files |
| **Sorting** | ❌ Missing | 0% | 0 files |
| **Searching** | ⚠️ Partial | 50% | 2 files |
| **Linked Lists** | ❌ Missing | 0% | 0 files |
| **Stack** | ❌ Missing | 0% | 0 files |
| **Queue** | ❌ Missing | 0% | 0 files |
| **Trees** | ❌ Missing | 0% | 0 files |
| **Graphs** | ❌ Missing | 0% | 0 files |
| **Hashing** | ✅ Good | 70% | 3 files |

### File Relevance Score

| File | Topics Covered | Relevance Score |
|------|---------------|-----------------|
| `App.tsx` | Arrays (insert/delete/update) | ⭐⭐⭐⭐⭐ |
| `components/views/TaskView.tsx` | Arrays, Linear Search, Filtering | ⭐⭐⭐⭐⭐ |
| `components/views/Dashboard.tsx` | Arrays (reduce/aggregation) | ⭐⭐⭐⭐ |
| `components/views/TaskReallocateView.tsx` | Hash Map | ⭐⭐⭐⭐ |
| `services/notificationStore.ts` | Hashing (key-value store) | ⭐⭐⭐⭐ |
| `services/geminiService.ts` | Array transformations | ⭐⭐⭐ |
| `types.ts` | OOP interfaces/enums | ⭐⭐⭐ |
| `components/TaskModal.tsx` | OOP encapsulation, UUID hashing | ⭐⭐⭐ |

---

## Recommended Additions for Complete Syllabus Coverage

### Priority 1: Essential DSA Implementations

1. **Create `src/datastructures/` folder:**
   - `LinkedList.ts` (singly, doubly, circular)
   - `Stack.ts` (array and linked list based)
   - `Queue.ts` (simple, circular, priority)
   - `Tree.ts` (BST, traversals)
   - `Graph.ts` (adjacency list, BFS/DFS)
   - `HashMap.ts` (custom implementation)

2. **Create `src/algorithms/` folder:**
   - `sorting.ts` (bubble, insertion, quick, heap)
   - `searching.ts` (linear, binary)
   - `graphAlgorithms.ts` (MST, shortest path)
   - `treeAlgorithms.ts` (traversals, Huffman)

3. **Create `src/demos/` folder:**
   - `StackApplications.tsx`
   - `QueueApplications.tsx`
   - `LinkedListApplications.tsx`
   - `GraphVisualization.tsx`
   - `SortingVisualization.tsx`

### Priority 2: Integration with Existing Features

1. **Task Dependencies (Graph):**
   - Add dependency field to `Task` interface
   - Implement dependency graph in `services/dependencyGraph.ts`
   - Add cycle detection before task creation
   - Create dependency visualization view

2. **Priority-Based Scheduling (Priority Queue):**
   - Replace AI scheduling with heap-based priority queue
   - Show comparison between AI and algorithmic scheduling
   - Add time complexity analysis UI

3. **Task Sorting:**
   - Add sort controls in `TaskView.tsx`
   - Implement multiple sorting algorithms
   - Compare performance visually

4. **Undo/Redo (Stack):**
   - Implement in `App.tsx`
   - Add keyboard shortcuts (Ctrl+Z, Ctrl+Y)
   - Visualize stack state

---

## How to Use This Mapping for Learning

### For Each Topic:

1. **Read Theory** (textbook/notes)
2. **Find Related File** (use this mapping)
3. **Analyze Implementation** (read the code)
4. **Identify Gaps** (what's missing?)
5. **Implement Missing Parts** (follow suggestions)
6. **Test & Verify** (write unit tests)
7. **Document Complexity** (time & space analysis)

### Example Learning Path:

**Week 1: Arrays & Searching**
- Study: `App.tsx`, `TaskView.tsx`
- Implement: Sorting in `utils/sorting.ts`
- Add: Sort buttons in UI

**Week 2: Linked Lists & Stacks**
- Create: `datastructures/LinkedList.ts`
- Implement: Undo/redo with stacks
- Test: Add unit tests

**Week 3: Queues & Priority Queues**
- Create: `datastructures/Queue.ts`
- Replace: AI scheduler with priority queue
- Compare: Performance differences

**Week 4: Trees & Graphs**
- Implement: Task dependency graph
- Add: Cycle detection
- Visualize: Task dependency tree

---

## Key Takeaways

✅ **Strong in:** Array operations, hash map usage, practical data manipulation

⚠️ **Partial:** OOP concepts (TypeScript style), searching (linear only)

❌ **Missing:** Sorting algorithms, linked lists, stacks, queues, trees, graphs (explicit implementations)

🎯 **Best Learning Opportunity:** Add graph-based task dependencies - combines real-world use case with graph algorithms (BFS, DFS, topological sort, cycle detection)

---

## Next Steps

Would you like me to:
1. **Generate the missing data structure files** (`LinkedList.ts`, `Stack.ts`, `Queue.ts`, etc.)
2. **Implement sorting algorithms** and integrate into `TaskView.tsx`
3. **Create graph-based task dependencies** feature (most educationally valuable)
4. **Build a Java parallel version** of the core data structures for OOP learning
5. **Create interactive demos** for each algorithm with visualizations

Let me know which implementation you'd like me to start with!
