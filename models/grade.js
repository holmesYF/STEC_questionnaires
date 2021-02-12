'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Grade.belongsToMany(models.Questionnaire, {
        through: models.Target,
        foreignKey: "gradeID",
      })
    }
  };
  Grade.init({
    grade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Grade',
  });
  return Grade;
};