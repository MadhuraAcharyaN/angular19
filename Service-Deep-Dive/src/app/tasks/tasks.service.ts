import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

// @Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);

  addNewTask(title: string, description: string): void {
    const newTask: Task = {
      description,
      title,
      status: 'OPEN',
      id: Math.random().toString(),
    };
    this.tasks.update((preTasks) => [...preTasks, newTask]);
    this.loggingService.log('ADDED TASK ' + title);
  }

  allTasks() {
    return this.tasks.asReadonly();
  }

  updateStatus(id: string, newStatus: TaskStatus) {
    this.tasks.update((allTasks) => {
      return allTasks.map((task) => {
        return {
          ...task,
          status: task.id === id ? newStatus : task.status,
        };
      });
    });
  }
}
