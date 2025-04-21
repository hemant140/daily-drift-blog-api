import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { BlogPostService } from './blog-post.service';
import { BLOGPOSTDTO } from 'apps/blog-post/src/dto/blog-post.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';


@Controller('blog-post')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Res() res: Response,
    @Req() req: Request,
    @Body() payload: BLOGPOSTDTO
  ) {
    const userId = req['userId']
    payload.author = userId
    try {
      await this.blogPostService.createPost(payload);

      return res.status(201).json({
        status: true,
        message: 'Post created successfully',
      });
    } catch (error) {
      return res.status(error?.statusCode || 500).json({
        status: false,
        message: error.message || 'Something went wrong while creating post',
      });
    }
  }

  @Get('user-posts')
  @UseGuards(JwtAuthGuard)
  async getAllUserPosts(
    @Res() res: Response,
    @Req() req: Request
  ) {
    const userId = req['userId']
    try {
      const response = await this.blogPostService.getAllUserPosts(userId);
      return res.status(200).json({
        status: true,
        data: response,
      });
    } catch (error) {
      return res.status(error?.statusCode || 500).json({
        status: false,
        message: error.message || 'Something went wrong while fetching posts',
      });
    }
  }

  @Get()
  async getAllPosts(
    @Res() res: Response,
  ) {
    try {
      const response = await this.blogPostService.getAllPosts();
      return res.status(200).json({
        status: true,
        data: response,
      });
    } catch (error) {
      return res.status(error?.statusCode || 500).json({
        status: false,
        message: error.message || 'Something went wrong while fetching posts',
      });
    }
  }

  @Get(':blogPostId')
  async getPostById(
    @Res() res: Response,
    @Param('blogPostId') blogPostId: string
  ) {
    try {

      console.log(blogPostId, " :blog post id")
      const response = await this.blogPostService.getPostById(blogPostId);
      return res.status(200).json({
        status: true,
        data: response,
      });
    } catch (error) {
      return res.status(error?.statusCode || 500).json({
        status: false,
        message: error.message || 'Something went wrong while fetching post',
      });
    }
  }

  @Put(':blogPostId')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Res() res: Response,
    @Param('blogPostId') blogPostId: string,
    @Body() data: Partial<BLOGPOSTDTO>,
  ) {
    try {
      console.log(data, "payload", blogPostId)
      const response = await this.blogPostService.updatePost(blogPostId, data);
      return res.status(200).json({
        status: true,
        message: 'Post updated successfully',
        data: response,
      });
    } catch (error) {
      return res.status(error?.statusCode || 500).json({
        status: false,
        message: error.message || 'Something went wrong while updating post',
      });
    }
  }

  @Delete(':blogPostId')
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Res() res: Response,
    @Param('blogPostId') blogPostId: string) {
    try {
      await this.blogPostService.deletePost(blogPostId);
      return res.status(200).json({
        status: true,
        message: 'Post deleted successfully',
      });
    } catch (error) {
      return res.status(error?.statusCode || 500).json({
        status: false,
        message: error.message || 'Something went wrong while deleting post',
      });
    }
  }


}
