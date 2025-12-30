import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 활성화
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `서버가 http://localhost:${process.env.PORT ?? 3000}에서 실행 중입니다.`,
  );
  console.log(
    `API 엔드포인트: http://localhost:${process.env.PORT ?? 3000}/api/matches`,
  );
}
bootstrap();
