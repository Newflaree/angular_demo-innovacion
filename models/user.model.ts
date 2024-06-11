import { Schema, model } from 'mongoose';
// Interfaces
import { UserProps } from '../interfaces/db-interfaces';

const UserSchema = new Schema<UserProps>({
  name: {
    type: String,
    required: [ true, 'Name is required' ],
  },
  email: {
    type: String,
    required: [ true, 'Email is required' ],
    unique: true
  },
  password: {
    type: String,
    required: [ true, 'Password is required' ]
  },
  img: {
    type: String
  },
  role: {
    type: String,
    default: 'USER_ROLE'
  },
  google: {
    type: Boolean,
    default: false
  },
  status: {
    type: Boolean,
    default: true
  },
});

UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
}

export default model<UserProps>( 'User', UserSchema );
