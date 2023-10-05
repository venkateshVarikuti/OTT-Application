
import { Sequelize } from 'sequelize';
import { createModels } from "./models/index";
const config = require("./config/config");
import { DbInterface } from "./dbtypes/DBInterface";
class Database {

   private db: Sequelize = null as any;
   public dbInterface: DbInterface = null as any;

   constructor() {
      this.db = new Sequelize(config.database, config.username, config.password, {
         host: config.host,
         dialect: config.dialect as any,
         logging:false, // Remove Log every query in to console.
         // connection pooling
         pool:{
            max:parseInt(config.pool.max) ,
            min:parseInt(config.pool.min) ,
            acquire:parseInt(config.pool.acquire),
            idle:parseInt(config.pool.idle),
         }
      });
      this.dbInterface = createModels(this.db);
   }
   syncModels() {
      this.dbInterface.sequelize.sync();
   }
   connect() {
      return this.db.authenticate();
   }

   close() {
      this.db.close();
   }
}

export const db = new Database();