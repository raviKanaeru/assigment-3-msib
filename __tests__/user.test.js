const request = require("supertest");
const app = require("../index");
const { User } = require("../models");

const userTestData = {
  username: "test",
  email: "test@gmail.com",
  password: "1",
};

// test untuk api register
describe("POST /users/register", () => {
  it("Should be response 201 status code", (done) => {
    request(app)
      .post("/users/register")
      .send(userTestData)
      .expect(201)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("username");
        expect(res.body).toHaveProperty("email");

        expect(res.body.username).toEqual("test");
        expect(res.body.email).toEqual("test@gmail.com");
        done();
      });
  });

  afterAll(async () => {
    try {
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
});

// test untuk api login
describe("POST /users/login", () => {
  beforeAll(async () => {
    try {
      await User.create(userTestData);
    } catch (error) {
      console.log(error);
    }
  });

  // response berhasil login
  it("Should be response 201 status code", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: userTestData.email,
        password: userTestData.password,
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).toHaveProperty("token");
        expect(typeof res.body.token).toEqual("string");
        done();
      });
  });

  // response gagal login jika username tidak ditemukan
  it("Should be response 404 status code", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: "salah",
        password: userTestData.password,
      })
      .expect(404)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("User not registered!");
        done();
      });
  });

  // response gagal login jika password salah
  it("Should be response 401 status code", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: userTestData.email,
        password: "salahpass",
      })
      .expect(401)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Incorrect password!");
        done();
      });
  });

  afterAll(async () => {
    try {
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
});
