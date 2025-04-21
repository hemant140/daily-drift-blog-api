import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    clientId = process.env.GOOGLE_CLIENT_ID


    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const user = {
            email: profile.emails[0].value,
            name: profile.name.givenName + " " + profile.name.familyName,
            avatar: profile.photos[0].value,
        };

        // console.log(user, "profile")

        done(null, user);
    }
}
