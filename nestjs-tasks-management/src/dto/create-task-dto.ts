import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'src/interfaces/task';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
  status: TaskStatus;
}
