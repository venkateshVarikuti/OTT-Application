"use strict";
console.log(process.cwd() + "../../.env")
require("dotenv").config({ path: process.cwd() + "../../.env" });

module.exports = {
  username: process.env.DB_USERNAME || 'OTTPROJECT' ,
  password: process.env.DB_PASSWORD || 'OTTProject',
  database: process.env.DB_NAME || 'database-1' ,
  host: process.env.DB_HOST || 'database-1.cluster-cjjvydwcuexr.eu-north-1.rds.amazonaws.com' ,
  port: process.env.DB_PORT || 5432,

  dialect: process.env.DB_DIALECT || "postgres",

  pool: {
    max: parseInt(process.env.POOL_MAX) || 50,
    min: parseInt(process.env.POOL_MIN) || 0,
    acquire: parseInt(process.env.POOL_ACQUIRE) || 60000,
    idle: parseInt(process.env.POOL_IDLE) || 10000,
  },
};