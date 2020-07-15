'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('presencas', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        data:{
          type: Sequelize.DATE,
          allowNull: false,
            },
        observacao:Sequelize.STRING,
        membro_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:{
              tableName:'membros'
            },
            key:'id'
          }
        },
      
        
        created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
      
      });
  
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('presencas');
  
  }
};
