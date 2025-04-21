import { BlogPost } from '@app/shared/schema/blogPost.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { BLOGPOSTDTO } from './dto/blog-post.dto';
import { STATUS } from '@app/shared/enums/status.enum';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectModel(BlogPost.name) private readonly blogPostModel: Model<BlogPost>
  ) { }


  async createPost(payload: BLOGPOSTDTO): Promise<BlogPost | null> {
    try {
      const response = await this.blogPostModel.create(payload);
      return response ? (response as BlogPost) : null;
    } catch (error) {
      console.error('Create Post Error:', error.message);
      return null;
    }
  }


  async getAllPosts(): Promise<BlogPost[]> {
    const response = await this.blogPostModel
      .find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email')
    return response;
  }

  async getPostsByUserId(userId: string): Promise<BlogPost[]> {
    try {
      const posts = await this.blogPostModel
        .find({ author: userId })
        .sort({ createdAt: -1 })
        .populate('author', 'name email');
      return posts;
    } catch (error) {
      console.error('Get Posts By User ID Error:', error.message);
      return [];
    }
  }



  async getPostById(blogPostId: string): Promise<BlogPost | null> {
    try {
      const response = await this.blogPostModel.findById(blogPostId).populate('author', 'name email');
      return response ? response as BlogPost : null;
    } catch (error) {
      console.error('Get Post By ID Error:', error.message);
      return null;
    }
  }


  async updatePost(id: string, payload: Partial<BLOGPOSTDTO>): Promise<BlogPost | null> {
    try {
      const response = await this.blogPostModel.findByIdAndUpdate(id, payload, { new: true });
      return response;

    } catch (error) {
      console.error('Update Post Error:', error.message);
      return null;
    }
  }


  async deletePost(blogPostId: string): Promise<boolean> {
    try {
      const response = await this.blogPostModel.findByIdAndDelete(blogPostId);
      return !!response;
    } catch (error) {
      console.error('Delete Post Error:', error.message);
      return false;
    }
  }

}
