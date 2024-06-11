import jwt from 'jsonwebtoken';

export const generateJWT = ( uid: object ) => {
  return new Promise( ( resolve, reject ) => {
    const payload = { uid };

    jwt.sign( payload, process.env.SECRET_KEY || '', {
      expiresIn: '24h'
    }, ( err, token ) => {
      if ( err ) {
        console.log( `${ '[HELPER.GENERATE-JWT]'.red }: Error details - ${ err }` );
        reject( 'Token could not be generated' );

      } else {
        resolve( token );
      }
    })
  });
}
