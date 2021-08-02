import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
/* import * as mongodb from 'mongodb';

const { MongoClient } = require('mongodb');

const test - mongodb

const uri =
  'mongodb+srv://anton:tester1986@cluster0.emsy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(err => {
  const collection = client.db('test').collection('devices');
  // perform actions on the collection object
  client.close();
}); */

@Module({
  imports: [
    ProductsModule,

    MongooseModule.forRoot(
      'mongodb+srv://anton:sW4ONKMExnotVdUk@cluster0.emsy8.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
      { useNewUrlParser: true },
    ),
    /*  MongooseModule.forRoot(
      'mongodb+srv://anton:tester1986@cluster0.emsy8.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
