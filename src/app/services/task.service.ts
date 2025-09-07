import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private API_URL = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(this.API_URL, { withCredentials: true });
  }

  addTask(task: {
    title: string;
    dueDate: string;
    completed: boolean;
  }): Observable<any> {
    return this.http.post(this.API_URL, task, { withCredentials: true });
  }

  updateTask(id: string, task: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, task, {
      withCredentials: true,
    });
  }

  toggleTask(id: string): Observable<any> {
    return this.http.put(
      `${this.API_URL}/${id}`,
      {},
      { withCredentials: true }
    );
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, { withCredentials: true });
  }
}
