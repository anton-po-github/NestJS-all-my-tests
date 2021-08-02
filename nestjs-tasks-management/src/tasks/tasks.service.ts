import { GetTasksFilterDto } from 'src/dto/get-tasks-filter.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task-dto';

import { Task, TaskStatus } from 'src/interfaces/task';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  public getAllTasks(): Array<Task> {
    return this.tasks;
  }

  public getTaskByFilters(filterDto: GetTasksFilterDto): Array<Task> {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      const newTasks = tasks.filter((item) => item.status === status);

      tasks = [...newTasks];
    }

    if (search) {
      /* const newTasks = tasks.filter((item) => {
        item.title.includes(search) || item.description.includes(search);
      });
 */

      /* const newTasks = tasks.filter((item) => {
        item.title.toLowerCase().search(search.toLowerCase()) !== -1;
      });
      tasks = [...newTasks]; */

      /* !!! for some unknown reason, the filter works only in this syntax !!! */

      tasks = tasks.filter(function (str) {
        return str.title.includes(search);
      });

      /*   tasks = tasks.filter(function (str) {
        return str.title.indexOf(search) !== -1;
      });
 */
      /*  tasks = tasks.filter(function (str) {
        return str.description.indexOf(search) !== -1;
      }); */

      /*  tasks = tasks.filter( (str) => {
         str.title.indexOf(search) !== -1 || 
         str.description.indexOf(search) !== -1
      });
 */
    }

    return tasks;
  }

  public getTaskById(id: string): Task {
    const found = this.tasks.find((item) => item.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  public updateTask(id: string, status: TaskStatus): Task {
    /* const index = this.tasks.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.tasks[index].title = body.title;
      this.tasks[index].description = body.description;
      this.tasks[index].status = body.status;
    } */

    const task = this.getTaskById(id);

    if (task) {
      //  task.title = body.title;
      //  task.description = body.description;
      task.status = status;
    }

    return task;
  }

  public deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);

    /* const index = this.tasks.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.tasks.splice(index, 1);

      return null;
    } */
  }
}
