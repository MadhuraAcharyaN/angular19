import { Component, computed, inject, signal } from '@angular/core';

import { TaskServiceToken } from '../../../main';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';
import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  private tasksService = inject(TaskServiceToken);
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService
          .allTasks()()
          .filter((task) => task.status === 'OPEN');

      case 'in-progress':
        return this.tasksService
          .allTasks()()
          .filter((task) => task.status === 'IN_PROGRESS');

      case 'done':
        return this.tasksService
          .allTasks()()
          .filter((task) => task.status === 'DONE');

      default:
        return this.tasksService.allTasks()();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
