import { Sequelize } from "sequelize";
import config from "config";

const db = new Sequelize(
   config.get('database'),
   config.get('dbUsername'),
   config.get('dbPassword'),
   {
      host: config.get('host'),
      dialect: config.get('dialect')
   }
);

export default db;