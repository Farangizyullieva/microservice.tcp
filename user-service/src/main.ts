import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  const host = String(process.env.HOST);
  const port = Number(process.env.PORT); 
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, 
    {
      transport : Transport.TCP,
      options : {host , port}
    }
    

  )

  await app.listen()
  console.log(`User service is running on http://${host}:${port}`)
}
bootstrap();
