import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from '@app/shared';
import { ConfigModule } from '@nestjs/config';
import { BlogPostModule } from './blog-post/blog-post.module';
import googleConfig from './config/google.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleConfig],
    }),
    BlogPostModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule { }
