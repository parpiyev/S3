import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string;

  @Prop()
  large: string;

  @Prop()
  medium: string;

  @Prop()
  thumb: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
