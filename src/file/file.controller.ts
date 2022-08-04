import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { File } from './schemas/file.schema';
import { SharpPipe } from 'src/middleware/sharp';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { S3 } from 'aws-sdk';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async create(@UploadedFile(SharpPipe) file) {
    return await this.fileService.create(file);
  }
}
