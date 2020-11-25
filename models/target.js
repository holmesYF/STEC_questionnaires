'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Target extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  Target.init({
    questionnaireID: DataTypes.INTEGER,
    gradeID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Target',
  });
  return Target;
};