import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Task } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  public getAllTasks() {
    return this.http.get(this.url + 'tasks');
  }

  public createTask(body: { title: string; description: string }) {
    console.log(body);
    return this.http.post(this.url + 'tasks', body);
  }

  public getOneTask(id: string) {
    return this.http.get(this.url + 'tasks/' + `${id}`);
  }

  public updateOneTask(
    id: string,
    body: { title: string; description: string; status: string }
  ) {
    return this.http.patch(this.url + 'tasks/' + `${id}`, body);
  }

  public deleteTask(id: string) {
    return this.http.delete(this.url + 'tasks/' + `${id}`);
  }
}
