import { NestFactory } from '@nestjs/core';
import { BlogPostModule } from './blog-post.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BlogPostModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002
      }
    }
  );

  console.info(`Blog post server is running on 3002`);

  await app.listen();
}
bootstrap();
