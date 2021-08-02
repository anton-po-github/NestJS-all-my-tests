import { TaskStatusValidPipe } from './pipes/task-status-valid.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { Task, TaskStatus } from './../interfaces/task';
import { CreateTaskDto } from 'src/dto/create-task-dto';
import { GetTasksFilterDto } from 'src/dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /*  @Get()
  public getALlTasks(): Array<Task> {
    return this.tasksService.getAllTasks();
  } */

  @Get()
  public getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Array<Task> {
    console.log(filterDto);

    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskByFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  public getTask(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  /* @Post()
  public createTask(@Body() body: { title: string; description: string }) {
    return this.tasksService.createTask(body.title, body.description);
  } */

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id')
  public updateTask(
    @Param('id') id: string,
    //  @Body() createTaskDto: CreateTaskDto,
    @Body('status', TaskStatusValidPipe) status: TaskStatus,
    //  @Body('status', new TaskStatusValidPipe(status)) status: TaskStatus,
  ) {
    return this.tasksService.updateTask(id, status);
  }

  /*   @Patch('/:id/status')
  public updateTask(
    @Param('id') id: string,
    @Body() status: TaskStatus,
  ) {
    return this.tasksService.updateTask(id, status);
  } */

  /*   @Post()
  public createTask2(
    @Body('title') title: string,
    @Body('description ') description: string,
  ) {
    return this.tasksService.createTask(title, description);
  } */

  @Delete('/:id')
  public deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }
}
