import { Injectable } from '@angular/core';
import { Task } from '../../model/task';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  getUserTask(userId: string): Task[] {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(task: Partial<Task>, userId: string): void {
    const newTask: Task = {
      ...task,
      id: 't' + this.tasks.length,
      userId: userId,
    } as Task;

    this.tasks.unshift(newTask);
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
