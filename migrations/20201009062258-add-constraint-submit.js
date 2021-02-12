'use strict';
// ユーザーテーブルへの外部キー制約を追加

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
        'Submits',{
          fields: ['userID'],
          type: 'foreign key',
          name: 'UsersID_constraint_fk_on_submit',
          references: { //Required field
            table: 'Users',
            field: 'id'
          },
          onDelete: 'cascade'
        })
  },
  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeConstraint('Submits', 'UsersID_constraint_fk_on_submit'),
      await queryInterface.removeIndex('Submits', 'UsersID_constraint_fk_on_submit'),
    ];
  }
};
