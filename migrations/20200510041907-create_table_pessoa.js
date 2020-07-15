'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pessoas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {

        type: Sequelize.STRING,
        allowNull: false,
      },
      data_nascimento: {

        type: Sequelize.DATE,
        allowNull: true,
      },
      sexo: {

        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      logradouro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {

        type: Sequelize.STRING,
        allowNull: true,
      },
      cidade: {

        type: Sequelize.STRING,
        allowNull: true,
      },
      uf: {

        type: Sequelize.STRING,
        allowNull: true,
      },
      
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    });

  },

  down: (queryInterface, Sequelize) => {


    return queryInterface.dropTable('pessoas');

  }
};