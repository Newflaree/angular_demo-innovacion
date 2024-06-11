import { Schema, model } from 'mongoose';
// Interfaces
import { HospitalProps } from '../interfaces/db-interfaces';

const HospitalSchema = new Schema<HospitalProps>({
  name: {
    type: String,
    required: [ true, 'Name is required' ],
  },
  img: {
    type: String
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: Boolean,
    default: true
  },
});

HospitalSchema.methods.toJSON = function() {
  const { __v, ...object } = this.toObject();
  return object;
}

export default model<HospitalProps>( 'Hospital', HospitalSchema );
