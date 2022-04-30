import { Schema, model } from 'mongoose';
import { UserType } from './userType';

const userSchema = new Schema({
  _id: { type: String, required: true, alias: 'id' },
  email: { type: String, maxLength: 255, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, minLength: 4, required: true, unique: true },
});

const UserModel = model<UserType>('User', userSchema);
export default UserModel;

userSchema.methods.findByLogin = async (login: string) =>
  await UserModel.findOne({
    $or: [{ username: login }, { email: login }],
  });
