import express from 'express';
import http from 'http';
import path from 'path';
import { json, urlencoded } from 'body-parser';
import configuration from '../package.json';
import seeds from '../seeds.json';
import db from './db';

const env = process.env.NODE_ENV || 'development';
const config = configuration.config[env];

const dbConnection = new db(path.join(__dirname, '../invoices.sqlite'));

const publicPath = path.join(__dirname, config.publicPath || 'public');

const app = express();
app.set('port', config.port || 8000);
app.use(json());
app.use(urlencoded());
app.use(express.static(publicPath));

export default app;

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
