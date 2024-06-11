import { Response } from 'express';
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
export const fileUpload = async ( req: FileRequest, res: Response ) => {
  const { id, collection } = req.params;

  let model: any;

  if ( !req.files ) {
    return res.status( 400 ).json({
      ok: false,
      msg: 'There are no files to upload'
    });
  }

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

    if ( model.img ) {
      const cutName = model.img.split( '/' );
      const name = cutName[ cutName.length - 1 ];
      const [ public_id ] = name.split( '.' );

      await cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    model.img = secure_url;
    await model.save();

    res.status( 200 ).json({
      ok: true,
      model
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.FILE-UPLOAD]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
