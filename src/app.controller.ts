import { Body, Controller, Get, HttpStatus, Post, Res, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { User } from './schemas/user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private userService: UserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  register(@Body() userBody) {
    this.userService.register(userBody).then((value: User) => {
      return 201;
    });
  }

  @Post('/login')
  login(@Body() userBody, @Res() res) {
    return this.userService.login(userBody).then((result: boolean) => {
      if (result) {
        return res.status(HttpStatus.OK).send();
      }
      return res.status(HttpStatus.UNAUTHORIZED).send();
    });
  }

  @Post('/post')
  @UseInterceptors(FileInterceptor('file'))
  createPost(@Body() userBody, @Res() res) {
    return this.userService.login(userBody).then((result: boolean) => {
      if (result) {
        return res.status(HttpStatus.OK).send();
      }
      return res.status(HttpStatus.UNAUTHORIZED).send();
    });
  }
}
