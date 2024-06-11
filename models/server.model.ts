import express, { Application } from 'express';
import fileupload from 'express-fileupload';
import cors from 'cors';
// Database
import dbConnection from '../database/config.db';
// Interfaces
import { ApiPaths } from '../interfaces/paths-interfaces';
// Routes
import {
  authRouter,
  doctorsRouter,
  hospitalsRouter,
  searchesRouter,
  uploadsRouter,
  usersRouter
} from '../routes';


class Server {
  private app: Application;
  private port: string;
  private apiPaths: ApiPaths;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3001';
    this.apiPaths = {
      auth:      '/api/auth',
      doctors:   '/api/doctors',
      hospitals: '/api/hospitals',
      searches:  '/api/searches',
      uploads:   '/api/uploads',
      users:     '/api/users',
    }

    // Init methods
    this.dbConnect();
    this.middlewares();
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use( cors() );
    // ParseBody
    this.app.use( express.json() );
    // Public Folder
    this.app.use( express.static( 'public' ) );
    // FileUpload
    this.app.use( fileupload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    this.app.use( this.apiPaths.auth,      authRouter );
    this.app.use( this.apiPaths.doctors,   doctorsRouter );
    this.app.use( this.apiPaths.hospitals, hospitalsRouter );
    this.app.use( this.apiPaths.searches,  searchesRouter );
    this.app.use( this.apiPaths.uploads,   uploadsRouter );
    this.app.use( this.apiPaths.users,     usersRouter );
  }

  listen() {
    this.app.listen( this.port, () => {
      console.clear();
      console.log( `${ '[SERVER.LISTEN]'.green }: Listening on port ${ this.port.green }` );
    });
  }
}

export default Server;
