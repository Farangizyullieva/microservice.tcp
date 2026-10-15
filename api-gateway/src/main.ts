import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = Number(process.env.API_PORT)
  app.useGlobalPipes(new ValidationPipe({
    transform : true , 
    whitelist : true, 
    forbidNonWhitelisted: true 
  }))
  app.useGlobalFilters()
  await app.listen(PORT , () => console.log('Server is running on port', PORT));
  
}
bootstrap();
