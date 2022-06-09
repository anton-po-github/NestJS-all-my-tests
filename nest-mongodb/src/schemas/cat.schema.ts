import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  /* @Prop([String])
  tags: string[];
  @Prop({ required: true })
  name: string; */
}

export const CatSchema = SchemaFactory.createForClass(Cat);

/* export const CatSchema2 = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
}); */
