import { TaskStatus } from './../../interfaces/task';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

export class TaskStatusValidPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: string, metaData: ArgumentMetadata) {
    value = value.toLocaleUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    const index = this.allowedStatus.indexOf(status);

    return index !== -1;
  }
}
