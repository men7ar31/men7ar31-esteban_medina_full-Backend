import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, default: null })
  resetToken: string | null; 

  @Prop({ type: Date, default: null })
  resetTokenExpiration: Date | null; 
}

export const UserSchema = SchemaFactory.createForClass(User);
