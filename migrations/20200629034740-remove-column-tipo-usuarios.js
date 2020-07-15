'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.removeColumn('usuarios','tipo');
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.addColumn('usuarios','tipo',Sequelize.STRING);
    
  }
};
