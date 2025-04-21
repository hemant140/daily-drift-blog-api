import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedModule } from '../../../libs/shared/src/shared.module';
import { Utility } from './helpers/utils.helper';
import { GoogleStrategy } from '../../api-gateway/src/oauth/google.strategies';


@Module({
  imports: [
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [
    Utility,
    AuthService,
    GoogleStrategy
  ],
})
export class AuthModule { }
