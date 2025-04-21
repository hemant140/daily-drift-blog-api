import {
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { BLOGPOSTDTO } from './dto/blog-post.dto';

@Controller()
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) { }


  @MessagePattern('blog-post.create')
  async createPost(@Payload() payload: BLOGPOSTDTO) {

    const response = await this.blogPostService.createPost(payload);

    if (!response) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_IMPLEMENTED,
        message: `Failed to create blog at this moment, please try again`,
      });
    }

    return response;
  }


  @MessagePattern('blog-post.get-all')
  async getAllPosts(@Payload() payload: { page: number, limit: number }) {
    const { page, limit } = payload;
    const response = await this.blogPostService.getAllPosts(page, limit);

    if (!response) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Something went wrong for get all blog post`,
      });
    }

    return response;
  }

  @MessagePattern('blog-post.get-user-post')
  async getUserAllPosts(@Payload() payload: { userId: string, page: number, limit: number }) {
    const { userId, page, limit } = payload
    // console.log(payload, "blog api")
    const response = await this.blogPostService.getPostsByUserId(userId, page, limit);
    if (!response) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Something went wrong for get all user blog post`,
      });
    }

    return response;
  }


  @MessagePattern('blog-post.get-by-id')
  async getPostById(@Payload() payload: { blogPostId: string }) {
    const response = await this.blogPostService.getPostById(payload.blogPostId);

    if (!response) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Blog post not found`,
      });
    }
    return response;
  }


  @MessagePattern('blog-post.update')
  async updatePost(@Payload() payload: { blogPostId: string; data: Partial<BLOGPOSTDTO> }) {
    const response = await this.blogPostService.updatePost(payload.blogPostId, payload.data);

    if (!response) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_MODIFIED,
        message: `Failed to update blog post`,
      });
    }
    return response;
  }


  @MessagePattern('blog-post.delete')
  async deletePost(@Payload() payload: { blogPostId: string }) {
    const success = await this.blogPostService.deletePost(payload.blogPostId);

    if (!success) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Failed to delete post`,
      });
    }
    return { success: true };
  }

}
