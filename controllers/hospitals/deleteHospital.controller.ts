import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
uuidv4();
// Models
import { Hospital } from '../../models';

/*
  PATH: '/api/hospitals/:id'
  DOC: 
*/
export const deleteHospital = async ( req: Request, res: Response ) => {
  const { id } = req.params;
  const uid = uuidv4();

  try {
    await Hospital.findByIdAndUpdate( id, { name: uid, status: false} );

    res.status( 200 ).json({
      ok: true,
      msg: `User was successfully deleted`
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.DELETE-HOSPITAL]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
