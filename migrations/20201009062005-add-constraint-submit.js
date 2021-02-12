'use strict';
// アンケートテーブルへの外部キー制約を追加

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
        'Submits',{
          fields: ['questionnaireID'],
          type: 'foreign key',
          name: 'questionnaireID_constraint_fk_on_submit',
          references: { //Required field
            table: 'Questionnaires',
            field: 'id'
          },
          onDelete: 'cascade'
        })
  },
  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeConstraint('Submits', 'questionnaireID_constraint_fk_on_submit'),
      await queryInterface.removeIndex('Submits', 'questionnaireID_constraint_fk_on_submit'),
    ];
  }
};
