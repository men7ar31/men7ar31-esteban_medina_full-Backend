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
  resetToken: string | null; // Token de recuperación, puede ser string o null

  @Prop({ type: Date, default: null })
  resetTokenExpiration: Date | null; // Expiración del token, puede ser Date o null
}

export const UserSchema = SchemaFactory.createForClass(User);
