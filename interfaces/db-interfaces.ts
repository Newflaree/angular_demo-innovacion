import { ObjectId } from "mongoose";

export interface UserProps {
  name: string;
  email: string;
  password: string;
  img?: string;
  role: string;
  google: boolean;
  status: boolean;
}

export interface HospitalProps {
  name: string;
  img?: string;
  user: ObjectId;
  status: boolean;
}

export interface DoctorProps {
  name: string;
  img?: string;
  user: ObjectId;
  hospital: ObjectId;
  status: boolean;
}
