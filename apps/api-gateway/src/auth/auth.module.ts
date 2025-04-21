import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ClientsModule.register([
      {
        name: "AUTH_CLIENT",
        transport: Transport.TCP,
        options: {
          port: 3001,
        }
      }
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
