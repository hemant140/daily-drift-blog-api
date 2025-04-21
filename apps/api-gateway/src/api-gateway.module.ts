import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from '@app/shared';
import { BlogPostModule } from './blog-post/blog-post.module';

@Module({
  imports: [
    BlogPostModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule { }
