import { Component, inject, input, output } from '@angular/core';
import { type Task } from '../../model/task';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe } from '@angular/common';
import { TasksComponent } from '../tasks.component';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [CardComponent, DatePipe],
})
export class TaskComponent {
  task = input.required<Task>();

  // complete = output<string>();

  private tasksService = inject(TasksService);

  onComplete() {
    // this.complete.emit(this.task().id);
    this.tasksService.removeTask(this.task().id);
  }
}
