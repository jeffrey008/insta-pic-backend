import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

import { User, UserDocument, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre<UserDocument>('save', function (next) {
            const salt = bcrypt.genSaltSync(10);
            this.password = bcrypt.hashSync(this.password, salt);
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  exports: [MongooseModule]
})
export class UsersModule {}
