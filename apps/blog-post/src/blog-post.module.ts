import { Module } from '@nestjs/common';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { SharedModule } from '../../../libs/shared/src/shared.module';

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [BlogPostController],
  providers: [BlogPostService],
})
export class BlogPostModule { }
