import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import 'regenerator-runtime/runtime.js';
import httpStarter from '~/src/factories/httpStarter';
import routes from '~/src/factories/routes';


const initApp = () => {
  console.log('Initializing application');
  dotenv.config({path: path.join(__dirname, '.env')});
  const server = express();
  routes(server);
  httpStarter(server);
};

try {
  initApp();
} catch (e) {
  console.log(`Error occurred: ${e}`);
}
