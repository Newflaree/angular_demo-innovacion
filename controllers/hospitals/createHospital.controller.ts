import { Response } from 'express';
import { UserAuthRequest } from '../../interfaces/http-interfaces';
// Models
import { Hospital } from '../../models';

/*
  PATH: '/api/hospitals'
  DOC: 
*/
export const createHospital = async ( req: UserAuthRequest, res: Response ) => {
  const name = req.body.name.toUpperCase();

  const data = {
    name,
    user: req.user._id
  }
  
  try {
    const hospital = new Hospital( data );
    await hospital.save();

    res.status( 201 ).json({
      ok: true,
      hospital
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.CREATE-HOSPITAL]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
