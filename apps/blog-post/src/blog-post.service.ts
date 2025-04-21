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


  async getAllPosts(page: number = 1, limit: number = 8): Promise<{
    total: number
    page: number
    limit: number
    postData: BlogPost[]
  }> {
    const skip = (page - 1) * limit;
    const response = await this.blogPostModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email');
    const total = await this.blogPostModel.countDocuments();

    return {
      total,
      page,
      limit,
      postData: response,
    };
  }

  async getPostsByUserId(userId: string, page: number = 1, limit: number = 8): Promise<{
    total: number
    page: number
    limit: number
    postData: BlogPost[]
  }> {
    const skip = (page - 1) * limit;
    const response = await this.blogPostModel
      .find({ author: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email');
    const total = await this.blogPostModel.countDocuments({ author: userId });

    return {
      total,
      page,
      limit,
      postData: response,
    };
  }

  // async getPostsByUserId(userId: string, page: number, limit: number): Promise<
  // total: number
  // page: number
  // limit: number
  // postData: BlogPost[]> {
  //   const skip = (page - 1) * limit;
  //   const response = await this.blogPostModel
  //     .find()
  //     .sort({ createdAt: -1 })
  //     .skip(skip)
  //     .limit(limit)
  //     .populate('author', 'name email');
  //   const total = await this.blogPostModel.countDocuments();

  //   return {
  //     total,
  //     page,
  //     limit,
  //     postData: response,
  //   };
  // try {
  //   const posts = await this.blogPostModel
  //     .find({ author: userId })
  //     .sort({ createdAt: -1 })
  //     .populate('author', 'name email');
  //   return posts;
  // } catch(error) {
  //   console.error('Get Posts By User ID Error:', error.message);
  //   return [];
  // }
  // }



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
