import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27217/S3'), FileModule],
})
export class AppModule {}
