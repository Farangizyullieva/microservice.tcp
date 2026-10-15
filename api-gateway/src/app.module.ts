import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : '.env',
      isGlobal : true 

    }),
    ClientsModule.register([
     { name : 'USER_SERVICE' ,
      transport : Transport.TCP, 
      options : {
         host : String(process.env.USER_HOST),
          port : Number(process.env.USER_PORT),
      }

     }
    ])

  ],
  controllers : [UserController]
  
})
export class AppModule {}
