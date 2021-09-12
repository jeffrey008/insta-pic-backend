import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async register(createUserDto: any): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async login(createUserDto: any): Promise<boolean> {
    return this.userModel
      .findOne({ username: createUserDto.username }, 'password')
      .then((user) => {
        return user && user.comparePassword(createUserDto.password);
      });
  }
}
