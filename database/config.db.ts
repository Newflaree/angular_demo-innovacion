import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect( process.env.MONGO_CNN || '' );
    console.log( `${ '[DATABASE.CONFIG]'.green }: Database ${ 'ONLINE'.green }` );
    
  } catch ( err ) {
    console.log( `${ '[DATABASE.CONFIG]'.red }: Error details - ${ err }` );
  }
}

export default dbConnection;
