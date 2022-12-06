'use strict';
// TODO 
/*
1. Mode -> UDP/ALARM/API
2. API_KEY 
3. URI UDP SERVER
4. PORT UDP 
7. URI API 
8. DEVICE_NAME
*/


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('device', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false
      },
      
    })

  },

  async down (queryInterface, Sequelize) {
  
  }
};
