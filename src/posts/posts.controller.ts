import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get('')
  getPost(@Query() query, @Res() res) {
    return this.postService.getAllPosts(query).then((result) => {
      if (result) {
        return res.status(HttpStatus.OK).send(result);
      }
    });
  }

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    // body['image'] = file.buffer;

    return this.postService.createPost(body).then((result) => {
      if (result) {
        return res.status(HttpStatus.CREATED).send();
      }
      return res.status(HttpStatus.UNAUTHORIZED).send();
    });
  }
}
