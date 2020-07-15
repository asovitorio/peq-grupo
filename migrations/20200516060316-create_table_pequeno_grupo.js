'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.createTable('grupos', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
  
          type: Sequelize.STRING,
          allowNull: false,
        },
       
        dia_semana: {
            type: Sequelize.STRING,
          allowNull: false,
        },
       usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:{
              tableName:'usuarios'
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
    return queryInterface.dropTable('grupos');
  }
};
