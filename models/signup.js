'use strict';
const {
  sequelize
} = require('../db');
const bcrypt = require('bcrypt')
const { DataTypes } = require('sequelize')
const {Role} =require('./role')
const Signup = sequelize.define('Signup',
  {
    id:{
      type:DataTypes.BIGINT,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
  sequelize,
  // modelName: 'Signups',
  tableName: 'Signups',
})
Signup.beforeCreate((user, options) => {

  return bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
    })
    .catch(err => {
      throw new Error();
    });
});
// Signup.prototype.validate = async(email,password) => {
//   const user = await Signup.findOne({email})
//   if(user){
//    const isAuth = await bcrypt.compare(password,user.password)
//    if(isAuth){
//      return user;
//    }
//    throw new Error('invalid password');
//   } else{
//     throw new Error('invalid Email');
//   }
// }
Role.hasOne(Signup, {
  foreignKey: 'RoleId'
});
Signup.belongsTo(Role);
module.exports = { Signup, sequelize }

