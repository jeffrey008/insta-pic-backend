import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { LeanDocument, Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: any): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async login(createUserDto: any): Promise<LeanDocument<User> | boolean> {
    return this.userModel
      .findOne({ username: createUserDto.username }, 'username password')
      .then((user) => {
        if (user && user.comparePassword(createUserDto.password)) {
          const userObj = user.toObject();
          delete userObj.password;
          userObj['accessToken'] = this.jwtService.sign(userObj, {
            expiresIn: '1d',
          });
          return userObj;
        }
        return false;
      });
  }
}
