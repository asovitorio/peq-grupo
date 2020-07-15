'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.addColumn('grupos','image',Sequelize.STRING);
   
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.removeColumn('grupos','image');
   
  }
};
