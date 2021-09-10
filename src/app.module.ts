import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { User, UserDocument, UserSchema } from './schemas/user.schema';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
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
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
