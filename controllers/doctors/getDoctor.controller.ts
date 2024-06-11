import { Request, Response } from 'express';
// Models
import { Doctor } from '../../models';

/*
  PATH: '/api/doctors/:id'
  DOC: 
*/
export const getDoctor = async ( req: Request, res: Response ) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById( id )
      .populate( 'user', 'name' ) 
      .populate( 'hospital', 'name' );

    res.status( 200 ).json({
      ok: true,
      doctor
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.GET-DOCTOR]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
