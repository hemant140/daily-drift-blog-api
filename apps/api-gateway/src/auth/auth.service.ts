import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SIGNINDTO } from 'apps/auth/src/dto/signin.dto';
import { SIGNUPDTO } from 'apps/auth/src/dto/signup.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(
        @Inject('AUTH_CLIENT') private readonly authClient: ClientProxy
    ) { }

    async signup(payload: SIGNUPDTO) {
        try {
            const response = await lastValueFrom(
                this.authClient.send('auth.signup', payload)
            );
            return response;
        } catch (error) {
            console.error(`Error from Auth Microservice:`, error.message);
            throw error;
        }
    }

    async signin(payload: SIGNINDTO) {
        try {
            const response = await lastValueFrom(
                this.authClient.send('auth.signin', payload)
            )
            return response;
        } catch (error) {
            console.error(`Error from signin api`, error.message);
            throw error;
        }
    }


    async googleRedirectAuth(user: any) {
        try {
            const response = await lastValueFrom(
                this.authClient.send('auth.google-redirect', user)
            );
            return response;
        } catch (error) {
            throw error;
        }
    }



}
