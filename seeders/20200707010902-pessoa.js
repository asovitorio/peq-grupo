'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkInsert('pessoas', [{
        id:1,
        nome: 'Adiministrador',
        data_nascimento: '2020-07-06',
        sexo:"Masculino",
        telefone:"1155550101",
        image:'adm.jpg',
        cep:'00000-000',
        logradouro:"Rua da Paz",
        numero:"222",
        complemento:"",
        bairro:"Sistema",
        cidade:"São Paulo",
        uf:"SP",
        created_at:new Date(),
        updated_at:new Date()
      }], {
        ignoreDuplicates: true,
        updateOnDuplicate: false,
        logging:true});
   
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('pessoas', null, {});
   
  }
};
