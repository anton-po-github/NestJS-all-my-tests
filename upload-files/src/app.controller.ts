import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import * as fs from 'fs';

import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { AppService } from './app.service';
import { editFileName, imageFileFilter } from './unitils/file-upload.utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  @Delete(':imgpath')
  async deleteFile(@Param('imgpath') imgpath: string) {
    const path = 'files\\' + `${imgpath}`;

    console.log(path);

    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) {
      console.error(err);
    }
  }

  /* @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename + file,
    };
    return response;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', { dest: './uploads', preservePath: false }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    console.log('path ' + file.filename);
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('photos[]', 10, { dest: './uploads' }))
  uploadMultiple(@UploadedFiles() files) {
    console.log(files);
  }

  @Post('upload/delete')
  async deleteFile() {
    const path = 'uploads\\d18caf7d9d10bf065ed328c5da629959';
    //  const path = String.raw`uploads\\40f4255a5f7ee169902dea169874c8a7`;

    console.log(path);

    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) {
      console.error(err);
    } */

  /* @Get('upload')
  async getFileByPath() {
    const testFolder = './uploads/';

    fs.readdir(testFolder, (err, files) => {
      files.forEach((file) => {
        console.log(file);
      });
    });
  } 

  @Get('upload')
  display(@Res() res) {
    res.sendFile('chrome_CzJILooDqC.png', { root: './uploads' });
  }*/
}
