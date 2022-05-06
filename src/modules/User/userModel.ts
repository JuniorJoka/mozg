import { Schema, model } from 'mongoose';
import { UserModel, UserType } from './userType';
import { compare, hash } from 'bcryptjs';
import config from '../../config';
import { v4 } from 'uuid';

const userSchema = new Schema<UserType, UserModel>({
  _id: { type: String, alias: 'id', default: () => v4() },
  email: { type: String, maxLength: 255, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, minLength: 4, required: true, unique: true },
});

userSchema.statics.findByLogin = async (login: string) =>
  await userModel.findOne({
    $or: [{ username: login }, { email: login }],
  });

userSchema.statics.generatePasswordHash = async (password: string) => {
  return await hash(password, Number(config.saltRounds));
};

userSchema.methods.validatePassword = async function (password: string) {
  return await compare(password, this.password);
};

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    this.set(
      'password',
      await userModel.generatePasswordHash(this.get('password'))
    );
  }

  if (this.isModified('username')) {
    this.set('username', this.get('username').toLowerCase());
  }

  if (this.isModified('email')) {
    this.set('email', this.get('email').toLowerCase());
  }

  done();
});

const userModel = model<UserType, UserModel>('User', userSchema);
export default userModel;
