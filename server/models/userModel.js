import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const User = db.define('users',{
   lastname:{
      type: DataTypes.STRING
   },
   firstname:{
      type: DataTypes.STRING
   },
   email:{
      type: DataTypes.STRING
   },
   password:{
      type: DataTypes.STRING
   },
   refresh_token:{
      type: DataTypes.TEXT
   },
   role:{
      type: DataTypes.STRING
   }
},{
    freezeTableName: true,
    timestamps: false
});
 
export default User;