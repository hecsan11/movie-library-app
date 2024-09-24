import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // If we not enable CORS , we will have errors in browsers with CORS
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
