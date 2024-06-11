import { Request, Response } from 'express';
import path from 'path';
// Cloudinary
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );
// Interfaces
import { FileRequest } from '../../interfaces/http-interfaces';
// Models
import { Doctor, Hospital, User } from '../../models';

/*
  PATH: '/api/uploads/:collection/:id'
  DOC: 
*/
export const showImg = async ( req: FileRequest, res: Response ) => {
  const { collection, id } = req.params;

  let model;

  try {
    switch ( collection ) {
      case 'doctors': 
        model = await Doctor.findById(id)

        if ( !model ) {
          return res.status( 400 ).json({
            ok: false,
            msg: 'There is no doctor with that id'
          });
        }

        break;

      case 'hospitals': 
        model = await Hospital.findById(id)

        if ( !model ) {
          return res.status( 400 ).json({
            ok: false,
            msg: 'There is no hospital with that id'
          });
        }

        break;

      case 'users': 
        model = await User.findById(id)

        if ( !model ) {
          return res.status( 400 ).json({
            ok: false,
            msg: 'There is no user with that id'
          });
        }

        break;

      default: 
        return res.status( 500 ).json({
          ok: false,
          msg: 'This endpoint is not yet validated'
        });
    }

    if ( !model?.img ) {
      const imagePath = path.join( __dirname, '../../../assets/no-image.jpeg' );
      return res.sendFile( imagePath );
    }

    res.status( 200 ).json({
      ok: true,
      img: model.img
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.SHOW-IMG]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
