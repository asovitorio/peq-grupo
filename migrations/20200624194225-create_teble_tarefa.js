'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.createTable('tarefas',
       {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        data:{
        type: Sequelize.DATE,
        allowNull: false,

        },
        status:{
        type: Sequelize.STRING,
        allowNull: false,

        },
        observacao:{
        type: Sequelize.STRING,
        allowNull: false,

        },

        grupos_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:{
              tableName:'grupos'
            },
            key:'id'
          }
        },
       licoes_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:{
              tableName:'licoes'
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
  
      return queryInterface.dropTable('tarefas');
    
  }
};
