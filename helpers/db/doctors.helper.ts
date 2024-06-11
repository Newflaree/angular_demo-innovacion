import { Doctor } from "../../models"

export const doctorIdValidation = async ( id: string ) => {
  const doctorExists = await Doctor.findById(id);

  if ( !doctorExists || !doctorExists.status ) {
    throw new Error( 'There is no doctor with that id' );
  }

  return true;
}
