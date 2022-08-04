import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import sizeOf from 'image-size';
import { S3 } from 'aws-sdk';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<object>>
{
  async transform(image: Express.Multer.File): Promise<object> {
    if (
      ![
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/svg+xml',
      ].includes(image.mimetype)
    )
      throw new Error('Please upload a picture!');

    const dimensions = sizeOf(image.buffer);
    const s3 = new S3({
      accessKeyId: 'AKIARZNHHEJHSI6KEZHI',
      secretAccessKey: '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',
      region: 'eu-west-2',
    });

    const type = path.extname(image.originalname),
      filename: any = {};

    if (dimensions.width >= 2048 && dimensions.height >= 2048) {
      filename.large = `large-${Date.now()}${type}`;

      const a = await s3
        .upload({
          Bucket: 'user-for-interview-test-cases',
          Body: await sharp(image.buffer).resize(2048, 2048).toBuffer(),
          Key: filename.large,
        })
        .promise();
      console.log(a);

      filename.medium = `medium-${Date.now()}${type}`;

      await s3
        .upload({
          Bucket: 'user-for-interview-test-cases',
          Body: await sharp(image.buffer).resize(2048, 2048).toBuffer(),
          Key: filename.medium,
        })
        .promise();

      filename.thumb = `thumb-${Date.now()}${type}`;

      await s3
        .upload({
          Bucket: 'user-for-interview-test-cases',
          Body: await sharp(image.buffer).resize(2048, 2048).toBuffer(),
          Key: filename.thumb,
        })
        .promise();
    } else if (dimensions.width >= 1024 && dimensions.height >= 1024) {
      filename.medium = `medium-${Date.now()}${type}`;

      await s3
        .upload({
          Bucket: 'user-for-interview-test-cases',
          Body: await sharp(image.buffer).resize(2048, 2048).toBuffer(),
          Key: filename.medium,
        })
        .promise();

      filename.thumb = `thumb-${Date.now()}${type}`;

      await s3
        .upload({
          Bucket: 'user-for-interview-test-cases',
          Body: await sharp(image.buffer).resize(2048, 2048).toBuffer(),
          Key: filename.thumb,
        })
        .promise();
    } else if (dimensions.width >= 300 && dimensions.height >= 300) {
      filename.thumb = `thumb-${Date.now()}${type}`;

      await s3
        .upload({
          Bucket: 'user-for-interview-test-cases',
          Body: await sharp(image.buffer).resize(2048, 2048).toBuffer(),
          Key: filename.thumb,
        })
        .promise();
    }

    return filename;
  }
}
