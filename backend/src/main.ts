import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const loggerType = process.env.LOGGER_TYPE || 'dev';
  if (loggerType === 'json') {
    app.useLogger(new JsonLogger());
  } else if (loggerType === 'tskv') {
    app.useLogger(new TskvLogger());
  } else {
    app.useLogger(new DevLogger());
  }

  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
