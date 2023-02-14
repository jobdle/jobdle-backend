import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ResponseMessage, ResponseToken } from 'src/model/response';
import { UserDto } from 'src/model/dto/user.dto';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly chatroomService: ChatroomService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserDto> {
    const user = await this.userService.findOne(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log(user.verifyEmail);
      if (!user.verifyEmail) {
        throw new BadRequestException('please verify account in your email.');
      }
      return user;
    }
    return null;
  }

  async login(user: any): Promise<ResponseToken> {
    console.log(user);
    const payload = await {
      username: user.username,
      sub: user._id,
      role: user.role,
      fullname: await ((await user.firstname) + ' ' + (await user.lastname)),
    };
    console.log(payload);
    return await {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async verifyEmail(user: any): Promise<ResponseMessage> {
    const userId = await user.userId;
    const body = await { verifyEmail: 1 };
    await this.userService.updateOneUserData(userId, body);
    this.chatroomService.newroom(await user.id, await user.fullName);
    return { message: 'verify email successfully.' };
  }
}
