import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId | undefined;

  @Prop()
  name: string | undefined;

  @Prop()
  email: string | undefined;

  @Prop()
  password: string | undefined;

  @Prop()
  token: string | undefined;

  @Prop()
  isEmailValidated: boolean | undefined;
}

export const UserSchema = SchemaFactory.createForClass(User);
