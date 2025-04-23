

import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';


const mockBlogPostService = {
    createPost: jest.fn(),
    getAllUserPosts: jest.fn(),
    getAllPosts: jest.fn(),
    getPostById: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
};

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwidXNlcklkIjoiNjgwOGJkMDQwNmFlMGY0MTVmOTM0ZmQ3IiwiaWF0IjoxNzQ1NDA0MDk0LCJleHAiOjE3NDc5OTYwOTR9.0op4KWyMeng7uwXQFQPj8OTyBWHnmJnqQtr7we2SIso";

describe('BlogPostController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [BlogPostController],
            providers: [
                {
                    provide: BlogPostService,
                    useValue: mockBlogPostService,
                },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({
                canActivate: jest.fn(() => true),
            })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('Create BLOG-POST API Testing:-', () => {
        it('Title validation error if title is missing', async () => {
            const response = await request(app.getHttpServer())
                .post('/blog-post')
                .set('Authorization', `Bearer ${token}`)
                .send({ description: 'desc', tag: 'tag' });

            expect(response.status).toBe(400);
            expect(response.body.message).toContain('title is required');
        });

        it('Create Post success if valid data and token provided', async () => {

            mockBlogPostService.createPost.mockResolvedValue(true);
            const response = await request(app.getHttpServer())
                .post('/blog-post')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Top User #3 First post Ways to Improve Team Productivity in a Hybrid Setup',
                    description: 'This is a sample blog content showing how to create a detail page in Angular. You can dynamically show content using data passed via route parameters.',
                    tag: 'Productivity',
                    topics: ['Efficiency', 'Hybrid Culture'],
                    image: 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg',
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Post created successfully');
        });

    });

    describe('Get USER-BLOG-POSTS API Testing:-', () => {
        it('All user post return', async () => {
            mockBlogPostService.getAllUserPosts.mockResolvedValue([]);
            const response = await request(app.getHttpServer())
                .get('/blog-post/user-posts')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
        });
    });

    describe('Get all BLOG-POSTS API Testing:-', () => {
        it('All posts return', async () => {
            mockBlogPostService.getAllPosts.mockResolvedValue([]);
            const response = await request(app.getHttpServer())
                .get('/blog-post');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
        });
    });

    describe('Get BLOG-POST BY ID API Testing:-', () => {
        it('Get by id post return post by id', async () => {
            mockBlogPostService.getPostById.mockResolvedValue({ title: 'Test Post' });
            const response = await request(app.getHttpServer())
                .get('/blog-post/68052c00742c28f5105678c9');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
        });
    });

    describe('Update BLOG-POST API Testing:-', () => {
        it('Update post and return success', async () => {
            mockBlogPostService.updatePost.mockResolvedValue({});
            const response = await request(app.getHttpServer())
                .put('/blog-post/6808c21d58b89c38dcf129eb')
                .set('Authorization', `Bearer ${token}`)
                .send({ title: 'Updated Title' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Post updated successfully');
        });
    });

    describe('Delete BLOG-POST API Testing:-', () => {
        it('Delete a blog post by ID', async () => {
            const response = await request(app.getHttpServer())
                .delete('/blog-post/1')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Post deleted successfully');
        });
    });
});
