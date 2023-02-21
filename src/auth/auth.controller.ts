import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Query,
  Get,
} from '@nestjs/common';
import { UserDto } from 'src/model/dto/user.dto';
import { ResponseMessage, ResponseToken } from 'src/model/response';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { VerifyEmailGuard } from './guard/verifyEmail.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req): Promise<ResponseToken> {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body() data: UserDto): Promise<ResponseMessage> {
    return await this.userService.createUserAccount(data);
  }

  @UseGuards(VerifyEmailGuard)
  @Post('verify')
  async verifyEmail(@Request() req): Promise<ResponseMessage> {
    console.log(2);
    console.log(req.user);
    return await this.authService.verifyEmail(req.user);
  }

  @Get('verify')
  async resendVerifyEmail(email: string): Promise<ResponseMessage> {
    return await this.authService.resendVerifyEmail(email);
  }
}
