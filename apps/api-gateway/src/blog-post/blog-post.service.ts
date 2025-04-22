import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BLOGPOSTDTO } from 'apps/blog-post/src/dto/blog-post.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BlogPostService {
    constructor(
        @Inject('BLOG_POST_CLIENT') private readonly blogPostClient: ClientProxy,
    ) { }

    async createPost(payload: BLOGPOSTDTO) {
        return await lastValueFrom(
            this.blogPostClient.send('blog-post.create', payload),
        );
    }

    async getAllUserPosts(userId: string, page: number, limit: number, search: string = '') {
        return await lastValueFrom(
            this.blogPostClient.send('blog-post.get-user-post', { userId, page, limit, search }),
        );
    }

    async getAllPosts(page: number, limit: number, search: string = '') {
        return await lastValueFrom(
            this.blogPostClient.send('blog-post.get-all', { page, limit, search }),
        );
    }

    async getPostById(blogPostId: string) {
        return await lastValueFrom(
            this.blogPostClient.send('blog-post.get-by-id', { blogPostId }),
        );
    }

    async updatePost(blogPostId: string, data: Partial<BLOGPOSTDTO>) {
        return await lastValueFrom(
            this.blogPostClient.send('blog-post.update', { blogPostId, data }),
        );
    }

    async deletePost(blogPostId: string) {
        return await lastValueFrom(
            this.blogPostClient.send('blog-post.delete', { blogPostId }),
        );
    }

}
