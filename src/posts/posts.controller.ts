import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  @Get('') 
  getPost(@Param() params, @Res() res) {
    return `Posts with params ${params}`

    // return this.userService.login(userBody).then((result: boolean) => {
    //   if (result) {
    //     return res.status(HttpStatus.OK).send();
    //   }
    //   return res.status(HttpStatus.UNAUTHORIZED).send();
    // });
  }

  @Post('/post')
  @UseInterceptors(FileInterceptor('file'))
  createPost(@Body() body, @Res() res) {
    return `Post created with Body ${body}`
    // return this.userService.login(userBody).then((result: boolean) => {
    //   if (result) {
    //     return res.status(HttpStatus.OK).send();
    //   }
    //   return res.status(HttpStatus.UNAUTHORIZED).send();
    // });
  }

}
