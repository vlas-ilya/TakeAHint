import * as expressStaticGzip from 'express-static-gzip';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    '/',
    expressStaticGzip(join(__dirname, '..', '..', 'takeahint-client', 'build'), {
      enableBrotli: true,
    }),
  );
  await app.listen(8080);
}

const ignored = bootstrap();
