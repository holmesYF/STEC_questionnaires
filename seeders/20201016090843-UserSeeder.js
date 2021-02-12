'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    const now = new Date();
     await queryInterface.bulkInsert('Users', [
       {lineID: "1", age: 23, sex: 1, gradeID: 3, createdAt: now, updatedAt: now},
       {lineID: "2", age: 22, sex: 2, gradeID: 5, createdAt: now, updatedAt: now},
      ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     */ Example:
      await queryInterface.bulkDelete('Users', null, {});
     
  }
};
