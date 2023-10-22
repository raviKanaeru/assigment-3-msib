const { Photo, User } = require("../models");

class PhotoController {
  // data photo bisa diakses jika sudah login
  // get data
  static async getAllData(req, res) {
    try {
      const data = await Photo.findAll({
        include: User,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // bisa diakses jika userIdnya sama dengan yang login
  static async getDataById(req, res) {
    try {
      const { id } = req.params;
      const userData = req.userData;
      const data = await Photo.findOne({
        where: {
          id: id,
          UserId: userData.id,
        },
      });

      if (!data) {
        throw {
          code: 404,
          message: "Data tidak ditemukan",
        };
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }
  static async createData(req, res) {
    try {
      const { title, caption, image_url } = req.body;
      const userData = req.userData;
      const data = await Photo.create({
        title,
        caption,
        image_url,
        UserId: userData.id,
      });
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateDataById(req, res) {
    try {
      const { title, caption, image_url } = req.body;
      const { id } = req.params;
      const userData = req.userData;
      const data = await Photo.update(
        {
          title,
          caption,
          image_url,
        },
        {
          where: {
            id: id,
            UserId: userData.id,
          },
          returning: true,
        }
      );

      if (!data[0]) {
        throw {
          code: 404,
          message: "Data tidak ditemukan",
        };
      }

      res.status(201).json(data);
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }

  static async deleteData(req, res) {
    try {
      const { id } = req.params;
      const userData = req.userData;
      const data = await Photo.destroy({
        where: {
          id: id,
          UserId: userData.id,
        },
      });
      if (!data) {
        throw {
          code: 404,
          message: "Data tidak ditemukan",
        };
      }
      res.status(200).json("Data has deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = PhotoController;
