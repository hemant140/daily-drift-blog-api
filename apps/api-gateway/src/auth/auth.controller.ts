import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SIGNINDTO } from '../../../auth/src/dto/signin.dto';
import { SIGNUPDTO } from '../../..//auth/src/dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';
import { SchemaValidation } from '../validations/schema.validation';


@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @ApiOperation({ summary: 'Register Your Account', description: 'Create your account' })
  @ApiBody({ type: SIGNUPDTO })
  @ApiResponse({ status: 201, description: 'Sign up successfully' })
  async registerUser(
    @Res() res: Response,
    @Body(new ValidationPipe(SchemaValidation.signupSchema)) payload: SIGNUPDTO
  ) {
    try {
      await this.authService.signup(payload);

      return res.status(201).json({
        status: true,
        message: "Sign up successfully"
      });
    } catch (error) {
      return res.status(error?.statusCode || 500).json({
        status: false,
        message: 'Something went wrong during sign up',
      });
    }
  }

  @Post('signin')
  @ApiOperation({ summary: 'Log in your account', description: 'Login & get JWT token' })
  @ApiBody({ type: SIGNINDTO })
  @ApiResponse({ status: 201, description: 'User login in successfully' })
  async signin(
    @Res() res: Response,
    @Req() req: Request,
    @Body(new ValidationPipe(SchemaValidation.signinSchema)) payload: SIGNINDTO
  ) {
    try {
      const response = await this.authService.signin(payload);

      return res.status(201).json({
        status: true,
        data: response
      });

    } catch (error) {
      console.error("Error occur in signin: ", error.message)
      return res.status(error?.statusCode || 500).json({
        status: false,
        message: error.message || 'Something went wrong during sign in',
      });
    }

  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Initiate Google OAuth login',
    description: 'Redirects the user to Google OAuth consent screen',
  })
  @ApiResponse({ status: 200, description: 'Redirected to Google' })
  async googleAuth() { }


  @Get('google-redirect')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Google OAuth Redirect',
    description: 'Handles Google callback and returns a JWT with user info',
  })
  @ApiResponse({ status: 302, description: 'Redirects to frontend with token' })
  async googleRedirect(
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.authService.googleRedirectAuth(req.user);

      // console.log(response, "Gooogle response")

      const token = response?.token;

      const redirectUrl = `http://localhost:4200?token=${token}&name=${response.user.name}&avatar=${response.user.avatar}`;

      return res.redirect(redirectUrl);

    } catch (error) {
      console.error("Error occur in google signin: ", error.message)
      return res.status(error?.statusCode || 500).json({
        status: false,
        message: error.message || 'Something went wrong during Google sign-in',
      });
    }
  }

}
