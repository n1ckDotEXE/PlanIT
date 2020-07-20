'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gardens = sequelize.define(
    'Gardens', 
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      address: DataTypes.STRING
    }, 
    {}
  );
  Gardens.associate = function(models) {
    Gardens.belongsTo(models.Users, {
      foreignKey: 'userId'
    })
  };
  return Gardens;
};