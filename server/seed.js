import path from 'path';
import db from './db';
import configuration from '../package.json';
import seeds from '../seeds.json';

const env = process.env.NODE_ENV || 'development';
const config = configuration.config[env];

const dbConnection = new db(path.join(__dirname, `../${config.databaseFile || 'invoices.sqlite'}`));

dbConnection.seed(seeds);
