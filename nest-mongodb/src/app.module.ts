import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost/nest')],

  imports: [
    /*   MongooseModule.forRoot(
      'mongodb+srv://anton:sW4ONKMExnotVdUk@cluster0.emsy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      { useNewUrlParser: true },
    ), */

    /*  MongooseModule.forRoot('mongodb+srv://cluster0.iijhz.mongodb.net', {
      user: 'anton',
      pass: 'tester1986',
      dbName: 'nestjs-demo',
      w: 'majority',
      retryWrites: true,
      useNewUrlParser: true,
    }), */

    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    CatsModule,
  ],
  /*  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test', {
      connectionName: 'cats',
    }), */
  /* MongooseModule.forRoot('mongodb://localhost:27017/users', {
      connectionName: 'users',
    }) 
    ,
  ],*/
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
