import { Controller, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { SIGNUPDTO } from "./dto/signup.dto";
import { Utility } from "./helpers/utils.helper";
import { SIGNINDTO } from "./dto/signin.dto";
import { PROVIDERS } from "@app/shared/enums/provider.enum";
import { JwtService } from "@nestjs/jwt";


@Controller()
export class AuthController {
    constructor(
        private readonly utils: Utility,
        private readonly authService: AuthService
    ) { }

    @MessagePattern('auth.signup')
    async signup(
        @Payload() payload: SIGNUPDTO
    ) {
        const { email, password } = payload;
        const isUserExist = await this.authService.findByEmail(email)

        if (isUserExist) {
            throw new RpcException({
                statusCode: HttpStatus.CONFLICT,
                message: "Email already exists"
            })
        }

        payload.password = await this.utils.encrypt(password);
        payload.provider = PROVIDERS.NORMAL

        const response = await this.authService.createUser(payload);

        if (!response) {
            throw new RpcException(
                {
                    statusCode: HttpStatus.NOT_IMPLEMENTED,
                    message: `Failed to create user at this moment, please try again`
                }
            );

        }

        return true;
    }

    @MessagePattern('auth.signin')
    async signin(
        @Payload() payload: SIGNINDTO
    ) {
        const user = await this.authService.findByEmail(payload.email);

        if (!user) {
            throw new RpcException({
                statusCode: HttpStatus.CONFLICT,
                message: `User with email: ${payload.email} does not exists`
            });
        }

        const decryptedPassword = await this.utils.decrypt(payload.password, user.password);

        if (!decryptedPassword) {
            throw new RpcException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `Password is wrong`,
                }
            );
        }

        // console.log(user['_id'])

        const JWTpayload = {
            email: payload.email,
            role: user.role,
            userId: user['_id']
        }
        // console.log(JWTpayload)
        const token = this.utils.generateJWTToken(JWTpayload);
        user.password = ""
        return {
            token,
            user
        };
    }



    @MessagePattern('auth.google-redirect')
    async googleLogin(
        @Payload() payload: any
    ) {
        const { email, name, avatar } = payload;

        let user = await this.authService.findByEmail(email);

        const userPayload = {
            email,
            name,
            provider: PROVIDERS.GOOGLE,
            password: ""
        }

        if (!user) {
            user = await this.authService.createUser(userPayload);
        }

        // console.log(user, "User data")
        const JWTpayload = {
            email: user?.email,
            role: user?.role,
            userId: user?.['_id']
        };

        // console.log(JWTpayload, "JWT Payload")
        const token = this.utils.generateJWTToken(JWTpayload);

        return {
            message: "Successfully logged in via google",
            token,
            user,
        };
    }

}