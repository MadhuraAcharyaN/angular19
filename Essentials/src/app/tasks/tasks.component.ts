import {
  Component,
  OnChanges,
  SimpleChanges,
  computed,
  input,
  signal,
} from '@angular/core';
import { TaskComponent } from './task/task.component';
import { User } from '../model/user';
import { AddTaskComponent } from './add-task/add-task.component';
import { Task } from '../model/task';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  standalone: true,
  imports: [TaskComponent, AddTaskComponent],
})
export class TasksComponent {
  user = input.required<User>();
  isTaskAdding = signal<boolean>(false);

  constructor(private tasksService: TasksService) {}

  get selectedUserTasks() {
    return this.tasksService.getUserTask(this.user().id);
  }

  addTask(): void {
    this.isTaskAdding.set(true);
  }

  onCancelTask(): void {
    this.isTaskAdding.set(false);
  }
}
