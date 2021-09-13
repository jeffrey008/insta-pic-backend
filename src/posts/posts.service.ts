import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getAllPosts(query: any): Promise<Post[]> {
    const filter = {};
    if (query.user) {
      filter['user'] = query.user;
    }
    if (query.username) {
      const users = await this.userModel.find({ username: query.username });
      if (users.length > 0) {
        filter['user'] = users[0]._id;
      }
    }
    const q = this.postModel.find(filter).populate('user');
    if (query.orderBy) {
      q.sort({ [query.orderBy]: query.order });
    }
    return q.exec();
  }

  async createPost(body: any): Promise<Post> {
    const createdPost = new this.postModel(body);
    return createdPost.save();
  }
}
