import { isEmail } from 'validator';
import bcrypt from 'bcrypt';
import { InferSchemaType, models, Schema } from 'mongoose';
import { model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  try {
    const password = this.get('password');
    if (typeof password !== 'string') {
      throw new Error('Password must be a string');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    this.set('password', hash);
    next();
  } catch (error) {
    next(error as Error);
  }
});

export type User = InferSchemaType<typeof UserSchema>;

const User = models.User || model('User', UserSchema);

export default User;
