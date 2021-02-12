'use strict';
// 学年テーブルへの外部キー制約を追加

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
        'Targets',{
          fields: ['gradeID'],
          type: 'foreign key',
          name: 'gradeID_constraint_fk_on_target',
          references: { //Required field
            table: 'Grades',
            field: 'id'
          },
          onDelete: 'cascade'
        })
  },
  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeConstraint('Targets', 'gradeID_constraint_fk_on_target'),
      await queryInterface.removeIndex('Targets', 'gradeID_constraint_fk_on_target'),
    ];
  }
};
