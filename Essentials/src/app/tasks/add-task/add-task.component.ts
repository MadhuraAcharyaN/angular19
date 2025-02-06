import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../model/task';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  standalone: true,
  imports: [FormsModule],
})
export class AddTaskComponent {
  userId = input.required<string>();
  close = output<void>();

  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDueDate = signal('');

  private tasksService = inject(TasksService);

  onCancel(): void {
    this.close.emit();
  }

  onSubmit(): void {
    const newTask: Partial<Task> = {
      dueDate: this.enteredDueDate(),
      summary: this.enteredSummary(),
      title: this.enteredTitle(),
    };

    this.tasksService.addTask(newTask, this.userId());
    this.onCancel();
  }
}
