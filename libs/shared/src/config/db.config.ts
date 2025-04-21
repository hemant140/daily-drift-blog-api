import { BlogPost, blogPostSchema } from "../schema/blogPost.schema";
import { User, userSchema } from "../schema/user.schema";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

export const MONGO_CONFIG = [
    MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
            const mongoURL = configService.get<string>('MONGO_URL');
            const dbName = configService.get<string>('DB_NAME');
            const maxPoolSize = 10;

            if (!mongoURL || !dbName) {
                throw new Error('Somwthing went wrong while importing mongo URl and db');
            }

            console.log(`Mongo Database connected successfully`);

            return {
                uri: mongoURL,
                dbName: dbName,
                maxPoolSize: maxPoolSize
            }
        },
        inject: [ConfigService]
    }),
    MongooseModule.forFeature(
        [
            {
                name: User.name,
                schema: userSchema
            },
            {
                name: BlogPost.name,
                schema: blogPostSchema
            }
        ]
    )
]