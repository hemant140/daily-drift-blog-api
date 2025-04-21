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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';
import { SchemaValidation } from '../validations/schema.validation';

@ApiTags('Blog Posts')
@Controller('blog-post')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiBody({ type: BLOGPOSTDTO })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  async createPost(
    @Res() res: Response,
    @Req() req: Request,
    @Body(new ValidationPipe(SchemaValidation.blogPostSchema)) payload: BLOGPOSTDTO
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
  @ApiOperation({ summary: 'Get all blog posts by the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of user posts' })
  @ApiBearerAuth()
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
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiResponse({ status: 200, description: 'List of all posts' })
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
  @ApiOperation({ summary: 'Get blog post by ID' })
  @ApiParam({ name: 'blogPostId', description: 'BlogPostId of the blog post' })
  @ApiResponse({ status: 200, description: 'Blog post details' })
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
  @ApiOperation({ summary: 'Update a blog post by ID' })
  @ApiParam({ name: 'blogPostId', description: 'BlogPostId of the blog post' })
  @ApiBearerAuth()
  @ApiBody({ type: BLOGPOSTDTO })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  async updatePost(
    @Res() res: Response,
    @Param('blogPostId') blogPostId: string,
    @Body(new ValidationPipe(SchemaValidation.updateBlogPostSchema)) data: Partial<BLOGPOSTDTO>,
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
  @ApiOperation({ summary: 'Delete a blog post by ID' })
  @ApiParam({ name: 'blogPostId', description: 'BlogPostId of the blog post' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
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
