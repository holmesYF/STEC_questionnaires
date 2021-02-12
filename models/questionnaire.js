'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questionnaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Questionnaire.belongsToMany(models.Grade, {
        through: models.Target,
        foreignKey: "questionnaireID",
      })
    }
  };
  Questionnaire.init({
    title: DataTypes.STRING,
    question: DataTypes.JSON,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Questionnaire',
  });
  return Questionnaire;
};