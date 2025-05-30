import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from '@app/shared';
import { BlogPostModule } from './blog-post/blog-post.module';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [
    BlogPostModule,
    AuthModule,
    SharedModule,
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule { }
