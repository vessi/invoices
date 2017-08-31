import Sequelize from 'sequelize';
import { singular } from 'pluralize';
import 'babel-polyfill';
import { capitalize, camelize } from './utils';
import schema from './schema';

class DatabaseConnection {
  constructor(dbFile) {
    this.connection = new Sequelize(`sqlite://${dbFile}`, {
      dialect: 'sqlite',
      storage: dbFile
    });
    this.defineModels();
    this.connection.sync();
  }
  defineModels() {
    this.models = {};
    for (var table in schema) {
      if (schema.hasOwnProperty(table)) {
        const definition = schema[table];
        const modelName = singular(capitalize(camelize(table)));
        this.models[modelName] = this.connection.define(table, definition);
      }
    }
  }
  async seed(seeds) {
    try {
      await this.connection.sync();
      for (var table in seeds) {
        if (seeds.hasOwnProperty(table)) {
          const records = seeds[table];
          records.forEach((record) => {
            const modelName = singular(capitalize(camelize(table)));
            this.models[modelName].create(record);
          });
        }
      }
    } catch (error) {
      throw(error);
    }
  }
}

export default DatabaseConnection;
