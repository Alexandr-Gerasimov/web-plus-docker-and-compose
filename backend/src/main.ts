import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());
  await app.listen(config().port, () => {
    console.log(`Server is listening on port: ${config().port}`);
  });
}
bootstrap();
