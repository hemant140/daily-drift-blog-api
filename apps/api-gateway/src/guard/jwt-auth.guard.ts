import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private configService: ConfigService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Authorization token missing or invalid');
        }

        const token = authHeader.split(' ')[1];

        const jwtSecret = this.configService.get<string>('JWT_SECRECT_KEY')!;

        try {
            const decoded = jwt.verify(token, jwtSecret);
            // console.log(decoded, "Decode token")
            request['userId'] = decoded['userId'];
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
