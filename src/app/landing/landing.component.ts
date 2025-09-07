import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

interface Task {
  _id?: string;
  title: string;
  dueDate: string | Date; // allow both
  completed: boolean;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit, OnDestroy {
  // Pomodoro timer state
  timeLeft: number = 25 * 60;
  timer: any = null;
  isRunning: boolean = false;
  currentMode: 'pomodoro' | 'short' | 'long' = 'pomodoro';

  // Tasks state
  tasks: Task[] = [];
  newTaskName = '';
  newTaskDueDate = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.setTimeByMode(this.currentMode);
    this.loadTasks();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  // ⏰ POMODORO TIMER
  get formattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  startOrPauseTimer() {
    if (this.isRunning) this.stopTimer();
    else this.startTimer();
  }

  startTimer() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) this.timeLeft--;
      else {
        this.stopTimer();
        alert('Time is up!');
      }
    }, 1000);
  }

  stopTimer() {
    this.isRunning = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  resetTimer() {
    this.stopTimer();
    this.setTimeByMode(this.currentMode);
  }

  changeMode(mode: 'pomodoro' | 'short' | 'long') {
    this.currentMode = mode;
    this.resetTimer();
  }

  private setTimeByMode(mode: 'pomodoro' | 'short' | 'long') {
    if (mode === 'pomodoro') this.timeLeft = 25 * 60;
    else if (mode === 'short') this.timeLeft = 5 * 60;
    else this.timeLeft = 15 * 60;
  }

  // 🔥 TASKS
  private sortTasks() {
    this.tasks.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return dateA - dateB; // earliest first
    });
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.sortTasks(); // ✅ auto-sort after loading
      },
      error: (err) => console.error(err),
    });
  }

  addTask() {
    if (!this.newTaskName.trim() || !this.newTaskDueDate) return;

    this.taskService
      .addTask({
        title: this.newTaskName.trim(),
        dueDate: this.newTaskDueDate,
        completed: false,
      })
      .subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.sortTasks(); // ✅ keep sorted after adding
          this.newTaskName = '';
          this.newTaskDueDate = '';
        },
        error: (err) => console.error(err),
      });
  }

  toggleComplete(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;

    const task = this.tasks[index];
    if (task._id) {
      this.taskService
        .updateTask(task._id, { completed: task.completed })
        .subscribe({
          error: (err) => console.error(err),
        });
    }
  }

  deleteTask(i: number) {
    const task = this.tasks[i];
    if (!task._id) return;

    this.taskService.deleteTask(task._id).subscribe({
      next: () => {
        this.tasks.splice(i, 1);
        this.sortTasks(); // ✅ keep sorted after deleting
      },
      error: (err) => console.error(err),
    });
  }
}
