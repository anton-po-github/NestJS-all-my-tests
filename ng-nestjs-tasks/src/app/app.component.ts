import { Component } from '@angular/core';

import { ApiService } from './services/api.service';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app-nestjs-tasks';
  public items: Array<Task> = [];

  constructor(private apiService: ApiService) {
    let str = 'Hello world, welcome to the universe.'; // Returns true
    console.log(str.includes('Hello'));
  }

  public getAllTask(): void {
    this.apiService.getAllTasks().subscribe(
      (resp) => {
        if (resp) {
          this.items = resp as Array<Task>;
        }
        console.log(resp);
      },
      (err) => console.log(err)
    );
  }

  public createTask(): void {
    this.apiService
      .createTask({ title: 'title', description: 'description' })
      .subscribe(
        (resp) => {
          this.getAllTask();

          console.log(resp);
        },
        (err) => console.log(err)
      );
  }

  public getOneTask(id: string): void {
    this.apiService.getOneTask(id).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => console.log(err)
    );
  }

  public updateOneTask(id: string): void {
    this.apiService
      .updateOneTask(id, {
        title: 'new title',
        description: 'new description',
        status: 'IN_PROGRESS',
      })
      .subscribe(
        (resp) => {
          this.getAllTask();
          console.log(resp);
        },
        (err) => console.log(err)
      );
  }

  public deleteOneTask(id: string): void {
    this.apiService.deleteTask(id).subscribe(
      (resp) => {
        this.getAllTask();
        console.log(resp);
      },
      (err) => console.log(err)
    );
  }
}
