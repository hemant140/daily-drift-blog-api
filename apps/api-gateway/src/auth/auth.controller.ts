import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SIGNINDTO } from 'apps/auth/src/dto/signin.dto';
import { SIGNUPDTO } from 'apps/auth/src/dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Register Your Account', description: 'Create your account' })
  @ApiBody({ type: SIGNUPDTO })
  @ApiResponse({ status: 201, description: 'Sign up successfully' })
  @Post('signup')
  async registerUser(
    @Res() res: Response,
    @Body() payload: SIGNUPDTO
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
        message: error.message || 'Somwthing went wrong during sign up',
      });
    }
  }

  @ApiOperation({ summary: 'Log in your account', description: 'Login & get JWT token' })
  @ApiBody({ type: SIGNINDTO })
  @ApiResponse({ status: 201, description: 'User login in successfully' })
  @Post('signin')
  async signin(
    @Res() res: Response,
    @Req() req: Request,
    @Body() payload: SIGNINDTO
  ) {
    try {
      const response = await this.authService.signin(payload);

      return res.status(201).json({
        status: true,
        data: response
      });

    } catch (error) {

      return res.status(error?.statusCode || 500).json({
        status: false,
        message: error.message || 'Somwthing went wrong during sign in',
      });
    }

  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }


  @Get('google-redirect')
  @UseGuards(AuthGuard('google'))
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
      return res.status(error?.statusCode || 500).json({
        status: false,
        message: error.message || 'Something went wrong during Google sign-in',
      });
    }
  }

}
