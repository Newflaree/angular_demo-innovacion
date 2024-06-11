export * from 'colors';
import dotenv from 'dotenv';
dotenv.config();
// Models
import Server from "./models/server.model";

const server: Server = new Server;
server.listen();
