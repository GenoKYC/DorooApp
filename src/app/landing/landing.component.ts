import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service'; // ✅ import service

interface Task {
  _id?: string; // from DB
  title: string;
  deadline: string;
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

  ngOnInit() {
    this.setTimeByMode(this.currentMode);
    this.loadTasks(); // ✅ load from DB
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  // ⏰ Timer (unchanged)
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

  // ✅ Task methods (now call API)
  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: (err) => console.error(err),
    });
  }

  addTask() {
    if (!this.newTaskName.trim() || !this.newTaskDueDate) return;

    this.taskService
      .addTask({
        title: this.newTaskName.trim(),
        deadline: this.newTaskDueDate,
        completed: false, // ✅ make sure checkbox works
      })
      .subscribe({
        next: (task) => {
          // Ensure deadline is a Date object
          const fixedTask = {
            ...task,
            deadline: new Date(task.deadline),
          };

          this.tasks.push(fixedTask);
          this.newTaskName = '';
          this.newTaskDueDate = '';
        },
        error: (err) => console.error(err),
      });
  }

  toggleComplete(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  deleteTask(i: number) {
    const task = this.tasks[i];
    if (!task._id) return;

    this.taskService.deleteTask(task._id).subscribe({
      next: () => this.tasks.splice(i, 1),
      error: (err) => console.error(err),
    });
  }
}
