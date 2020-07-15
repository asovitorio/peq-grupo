'use strict';
const bcrypt = require('bcrypt');
require('dotenv').config()

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log(process.env.USER_PASS)
      return queryInterface.bulkInsert('usuarios', [{
        id:1,
        email: 'adm@adm',
        senha: bcrypt.hashSync(process.env.USER_PASS,10),
        status:1,
        pessoa_id:1,
        created_at: new Date(),
        updated_at: new Date()
        
      }], {
        ignoreDuplicates: true,
        updateOnDuplicate: false,
        logging:true
      });
 
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('usuarios', null, {});
   
  }
};
