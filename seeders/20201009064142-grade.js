'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Grades', [
      {grade:"b1",createdAt:now, updatedAt:now},
      {grade:"b2",createdAt:now, updatedAt:now},
      {grade:"b3",createdAt:now, updatedAt:now},
      {grade:"b4",createdAt:now, updatedAt:now},
      {grade:"m1",createdAt:now, updatedAt:now},
      {grade:"m2",createdAt:now, updatedAt:now},
      {grade:"d1",createdAt:now, updatedAt:now},
      {grade:"d2",createdAt:now, updatedAt:now},
      {grade:"d3",createdAt:now, updatedAt:now},
      {grade:"d4",createdAt:now, updatedAt:now},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Grades', null, {});
  }
};
