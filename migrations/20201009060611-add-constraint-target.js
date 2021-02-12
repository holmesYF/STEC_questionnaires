'use strict';
// アンケートテーブルへの外部キー制約を追加

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
        'Targets',{
          fields: ['questionnaireID'],
          type: 'foreign key',
          name: 'questionnaireID_constraint_fk_on_target',
          references: { //Required field
            table: 'Questionnaires',
            field: 'id'
          },
          onDelete: 'cascade'
        })
  },
  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeConstraint('Targets', 'questionnaireID_constraint_fk_on_target'),
      await queryInterface.removeIndex('Targets', 'questionnaireID_constraint_fk_on_target'),
    ];
  }
};
