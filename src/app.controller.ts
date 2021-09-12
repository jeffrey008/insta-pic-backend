import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { User } from './schemas/user.schema';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  register(@Body() userBody, @Res() res) {
    this.userService.register(userBody).then(
      (value: User) => {
        return 201;
      },
      (err) => {
        return res.status(500).json({
          message: 'Username has been used. Please use another username.',
        });
      },
    );
  }

  @Post('/login')
  login(@Body() userBody, @Res() res) {
    return this.userService.login(userBody).then((result: boolean) => {
      if (result) {
        return res.status(HttpStatus.OK).json({ username: userBody.username });
      }
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Incorrect username or password.' });
    });
  }
}
