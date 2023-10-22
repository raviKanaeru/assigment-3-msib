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
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Bunga Matahari",
          caption: "Ini foto bunga matahari",
          image_url: "https://source.unsplash.com/RmLSBjS5diE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Saturnus",
          caption: "Ini foto planet saturnus",
          image_url: "https://source.unsplash.com/2W-QWAC0mzI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Mars",
          caption: "Ini foto planet mars",
          image_url: "https://source.unsplash.com/t3KYQUUvfsc",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Hutan Amazon",
          caption: "Ini foto hutan amazon",
          image_url: "https://source.unsplash.com/pt7QzB4ZLWw",
          createdAt: new Date(),
          updatedAt: new Date(),
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
    await queryInterface.bulkDelete("Photos", null, {});
  },
};
