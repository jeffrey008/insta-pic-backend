import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) {}

  async getAllPosts(option: any): Promise<Post[]> {
    return this.postModel.find(option).exec();
  }

  async createPost(body: any): Promise<Post> {
    const createdPost = new this.postModel(body);
    return createdPost.save();
  }
}
