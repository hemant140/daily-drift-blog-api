import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
});

export const envConfig = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || '',

    // Add other env vars here (for example JWT, DB, etc.)
    JWT_SECRET: process.env.JWT_SECRET || '',
    DATABASE_URL: process.env.DATABASE_URL || '',
};

