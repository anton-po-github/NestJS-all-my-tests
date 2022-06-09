import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Cat } from 'src/schemas/cat.schema';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Delete('/:id')
  async deleteOneCat(@Param('id') id: string) {
    console.log(id);
    //  return this.catsService.deleteOneCat(id);
  }
}
