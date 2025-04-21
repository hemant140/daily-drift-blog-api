import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
    ) {
        super({
            clientID: '554479897017-jrf9le50kn4nc0q3h1id62t4oenmvps0.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:7001/api/v1/auth/google-redirect',
            scope: ['email', 'profile'],
        });
    }

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
