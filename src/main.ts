import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SocketIoAdapter } from './adapters/socket-io.adapters';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(+process.env.SERVER_PORT);
}
bootstrap();
