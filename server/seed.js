import path from 'path';
import db from './db';
import { config } from '../package.json';
import seeds from '../seeds.json';

const defaults = config.defaults;
const dbFileName = path.join(__dirname, `../${ process.env.DATABASE || defaults.databaseFile }`);
const dbConnection = new db(dbFileName);

dbConnection.seed(seeds);
