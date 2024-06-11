import { Response } from 'express';
import { UserAuthRequest } from '../../interfaces/http-interfaces';
// Models
import { Doctor } from '../../models';

/*
  PATH: '/api/doctors/:id'
  DOC: 
*/
export const updateDoctor = async ( req: UserAuthRequest, res: Response ) => {
  const { id } = req.params;
  const { status, ...rest } = req.body;
  rest.user = req.user._id;

  try {
    const doctor = await Doctor.findByIdAndUpdate( id, rest, { new: true })
      .populate( 'user', 'name' ) 
      .populate( 'hospital', 'name' );

    res.status( 200 ).json({
      ok: true,
      doctor
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.UPDATE-DOCTOR]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
