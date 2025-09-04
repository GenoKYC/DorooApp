import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="message"
      class="fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white text-sm"
      [ngClass]="{
        'bg-green-600': type === 'success',
        'bg-red-600': type === 'error'
      }"
    >
      {{ message }}
    </div>
  `,
})
export class ToastComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' = 'success';
}
