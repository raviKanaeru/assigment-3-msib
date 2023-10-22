const { User, Photo } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class UserController {
  static async getDataUserWithPhoto(req, res) {
    try {
      const data = await User.findAll({
        include: Photo,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const data = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        id: data.id,
        username: data.username,
        email: data.email,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // find data pada database
      const data = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!data) {
        throw {
          code: 404,
          message: "User not registered!",
        };
      }

      // verify password
      const isValidPassword = comparePassword(password, data.password);

      if (!isValidPassword) {
        throw {
          code: 401,
          message: "Incorrect password!",
        };
      }

      // generate token
      const token = generateToken({
        id: data.id,
        email: data.email,
        username: data.username,
      });

      res.status(200).json({
        token: token,
      });
    } catch (error) {
      res.status(error.code || 500).json(error);
    }
  }
}

module.exports = UserController;
