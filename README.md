# Blog Post Microservices App
#### A Microservices-Based Blog Platform Built with NestJS

Blog Post App is a full-featured blog platform using NestJS microservices. It allows users to browse blogs publicly, sign up with email/password or Google, and create, update, or delete their own blogs.

## Features

- Publicly view all blog posts
- Signup/Login with email & password or Google
- Create, update, and delete your own blogs
- View your blog list
- API documentation with Swagger
- Unit tested with Jest

## Tech
- NestJS (Node.js framework)
- TypeScript
- MongoDB or PostgreSQL
- JWT (authentication)
- Google OAuth
- Swagger for API Docs
- Jest for testing
- 
## Installation Steps

[Node.js](https://nodejs.org/) v18+ to run.

1.Install NestJS CLI (if not already installed)

```bash
npm i -g @nestjs/cli
```

2.Clone the repository

```bash
git clone https://github.com/hemant140/daily-drift-blog-api

cd daily-drift-blog-api
```

3.Install dependencies

```bash
npm install
```

4.Run the services

- Start all microservices in parallel
```bash
npm run start:all
```

- API Gateway:
```bash
npm run start:dev
```
- Start only the authentication microservice
```bash
npm run start:auth
```

- Start only the blog post microservice
```bash
npm run start:blog
```

## Run all test cases with verbose output
```bash
npm run test -- --verbose
```

## Swagger Documentation
```bash
http://localhost:7001/api/docs
```

## Environment Setup -- Find over the mail
```bash
MONGO_URL=mongodb+srv://hemohm579:FBzr9Uscmg38O3h9@crudoperations.ezgvkqq.mongodb.net/

DB_NAME=blog-post

POOL_SIZE=10

JWT_SECRECT_KEY='TFV5%BVDE@#$DCVHGF#$RCV743RDFVH'

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GOOGLE_CALLBACK_URL=
```

## API Endpoints Summary

### Authentication

- POST /auth/signup: Signup with name, email, password
- POST /auth/signin: Login using email, password
- GET /auth/google: Login/Signup with Google

### Blog Service

- GET /blog-post?page =1&limit=50: All public blogs
- GET /blog-post/user-posts?page =1&limit=50: Authenticated user's blogs
- GET /blog-post/:id: Get blog by ID
- POST /blog-post: Create blog (requires auth)
- PUT /blog-post/:id: Update blog (requires auth)
- DELETE /blog-post/:id: Delete blog (requires auth)

## Postman Collection
Postman collection provided for testing
- Import the Postman collection file
- Use /signin API to get the token
- Use the token as Bearer Token in the Authorization header for other APIs

## Notes
  - All authenticated routes require a Bearer token in headers

