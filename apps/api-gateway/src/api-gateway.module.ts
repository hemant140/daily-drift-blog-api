import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from '@app/shared';
import { ConfigModule } from '@nestjs/config';
import { BlogPostModule } from './blog-post/blog-post.module';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BlogPostModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule { }
