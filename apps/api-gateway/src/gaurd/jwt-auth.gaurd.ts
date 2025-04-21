import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor() { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Authorization token missing or invalid');
        }

        const token = authHeader.split(' ')[1];

        const jwtSecret = "TFV5%BVDE@#$DCVHGF#$RCV743RDFVH";

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
