"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Photos",
      [
        {
          title: "Bulan",
          caption: "Ini foto bulan",
          image_url: "https://source.unsplash.com/ve_uN9V8xqU",
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Bunga Matahari",
          caption: "Ini foto bunga matahari",
          image_url: "https://source.unsplash.com/RmLSBjS5diE",
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Saturnus",
          caption: "Ini foto planet saturnus",
          image_url: "https://source.unsplash.com/2W-QWAC0mzI",
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Mars",
          caption: "Ini foto planet mars",
          image_url: "https://source.unsplash.com/t3KYQUUvfsc",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: 2,
        },
        {
          title: "Hutan Amazon",
          caption: "Ini foto hutan amazon",
          image_url: "https://source.unsplash.com/pt7QzB4ZLWw",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
