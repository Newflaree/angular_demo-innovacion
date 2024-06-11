// Models
import { User } from "../../models"

export const emailValidation = async ( email: string ) => {
  const emailExists = await User.findOne({ email });

  if ( emailExists ) {
    throw new Error( 'There is already user with that email' );
  }

  return true;
}

export const idValidation = async ( id: string ) => {
  const userExists = await User.findById( id );

  if ( !userExists || !userExists.status ) {
    throw new Error( 'There is no user with that id' );
  }

  return true;
}
