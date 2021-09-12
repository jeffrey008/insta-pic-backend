import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass<User, UserDocument>(
  User,
);
UserSchema.loadClass(User);
