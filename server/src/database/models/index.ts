"use strict";
const config = require("../config/config");
import { Sequelize, DataTypes } from 'sequelize';
import { DbInterface } from '../dbtypes/DBInterface';

const sequelize: Sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect as any
});



export const createModels = (sequelize: Sequelize): DbInterface => {


  const db: DbInterface = {
    sequelize,
    Sequelize,
    models: {
    }
  }


  for (let model in db.models as any) {
    let m = (db.models as any)[model];
    if (m.associate) {
      m.associate(db.models);
    }
  }

  return db;
};
