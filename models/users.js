'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    Users.hasMany(models.Gardens, {
      foreignKey: 'userId',
    })
  };
  return Users;
};