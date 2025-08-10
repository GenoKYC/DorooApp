import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface Task {
  name: string;
  dueDate: string;
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
  timeLeft: number = 25 * 60; // <- correct initial value (25 min)
  timer: any = null;
  isRunning: boolean = false;
  currentMode: 'pomodoro' | 'short' | 'long' = 'pomodoro';

  // Tasks ...
  tasks: Task[] = [];
  newTaskName = '';
  newTaskDueDate = '';

  ngOnInit() {
    this.setTimeByMode(this.currentMode); // ensure consistent startup value
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
  startOrPauseTimer() {
    if (this.isRunning) {
      // If timer is running, pause it
      this.stopTimer();
    } else {
      // If timer is paused/stopped, start it
      this.startTimer();
    }
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

  // Task methods (unchanged)
  addTask() {
    if (!this.newTaskName.trim() || !this.newTaskDueDate) return;
    this.tasks.push({
      name: this.newTaskName.trim(),
      dueDate: this.newTaskDueDate,
      completed: false,
    });
    this.newTaskName = '';
    this.newTaskDueDate = '';
  }

  toggleComplete(i: number) {
    this.tasks[i].completed = !this.tasks[i].completed;
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }
}
