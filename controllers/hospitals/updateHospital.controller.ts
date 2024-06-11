import { Request, Response } from 'express';
// Models
import { Hospital } from '../../models';

/*
  PATH: '/api/hospitals/:id'
  DOC: 
*/
export const updateHospital = async ( req: Request, res: Response ) => {
  const { id } = req.params;
  const { img, status, _id, ...rest } = req.body;
  rest.name = rest.name.toUpperCase();

  try {
    const hospital = await Hospital.findByIdAndUpdate( id, rest, {new: true} )
      .populate( 'user', 'name' );

    res.status( 200 ).json({
      ok: true,
      hospital
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.UPDATE-HOSPITAL]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
