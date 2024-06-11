import { Schema, model } from 'mongoose';
// Interfaces
import { DoctorProps } from '../interfaces/db-interfaces';

const DoctorSchema = new Schema<DoctorProps>({
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
  hospital: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Hospital'
  },
  status: {
    type: Boolean,
    default: true
  },
});

DoctorSchema.methods.toJSON = function() {
  const { __v, ...object } = this.toObject();
  return object;
}

export default model<DoctorProps>( 'Doctor', DoctorSchema );
