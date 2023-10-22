const request = require("supertest");
const app = require("../index");
const { User, Photo } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { verifyToken } = require("../helpers/jwt");

const userDataTest = {
  username: "test",
  email: "test@gmail.com",
  password: "1",
};

const photoDataUser = {
  title: "test",
  caption: "ini foto test",
  image_url: "https://source.unsplash.com/HfIex7qwTlI",
};

// test untuk api createPhoto
describe("POST /photos (response createPhoto)", () => {
  let token;
  beforeAll(async () => {
    try {
      const data = await User.create(userDataTest);
      // generate token
      token = generateToken({
        id: data.id,
        email: data.email,
        username: data.username,
      });
    } catch (error) {
      console.log(error);
    }
  });
  // response berhasil createPhoto
  it("Should be response 201 status code (response sukses createPhoto)", (done) => {
    request(app)
      .post("/photos")
      .set("Authorization", token)
      .send(photoDataUser)
      .expect(201)
      .end((err, res) => {
        if (err) done(err);
        const find = verifyToken(token);
        expect(res.body).toHaveProperty("title");
        expect(res.body).toHaveProperty("caption");
        expect(res.body).toHaveProperty("image_url");
        expect(res.body).toHaveProperty("UserId");
        expect(res.body.title).toEqual("test");
        expect(res.body.caption).toEqual("ini foto test");
        expect(res.body.image_url).toEqual(
          "https://source.unsplash.com/HfIex7qwTlI"
        );
        expect(res.body.UserId).toEqual(find.id);
        done();
      });
  });

  // response jika tidak menyertakan autentifikasi
  it("Should be response 401 status code (Response error createPhoto karena tidak menyertakan authentikasi)", (done) => {
    request(app)
      .post("/photos")
      .send(photoDataUser)
      .expect(401)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).toEqual("Token not provided!");
        done();
      });
  });

  afterAll(async () => {
    try {
      await Photo.destroy({ where: {} });
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
});

// test untuk api getAllPhoto
describe("GET /photos (response getAllPhoto)", () => {
  let token;
  beforeAll(async () => {
    try {
      const dataUser = await User.create(userDataTest);
      const dataPhoto = await Photo.create({
        title: "test",
        caption: "ini foto test",
        image_url: "https://source.unsplash.com/HfIex7qwTlI",
        UserId: dataUser.id,
      });
      const dataPhoto1 = await Photo.create({
        title: "test2",
        caption: "ini foto test2",
        image_url: "https://source.unsplash.com/DKix6Un55mw",
        UserId: dataUser.id,
      });
      // generate token
      token = generateToken({
        id: dataUser.id,
        email: dataUser.email,
        username: dataUser.username,
      });
    } catch (error) {
      console.log(error);
    }
  });

  // response berhasil getAllPhoto
  it("Should be response 200 (response sukses getAllPhoto)", (done) => {
    request(app)
      .get("/photos")
      .set("Authorization", token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveLength(2);
        done();
      });
  });
  // response gagal getAllPhoto jika tidak disertakan token
  it("Should be response 401 (Response error getAllPhoto karena tidak menyertakan authentikasi)", (done) => {
    request(app)
      .get("/photos")
      .expect(401)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).toEqual("Token not provided!");
        done();
      });
  });
  afterAll(async () => {
    try {
      await Photo.destroy({ where: {} });
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
});

// test untuk api getPhotoById
describe("GET /photos/:id (response getPhotoById)", () => {
  let token;
  let dataAllPhoto;
  let dataAllPhoto1;
  beforeAll(async () => {
    try {
      const dataUser = await User.create(userDataTest);
      const dataUser1 = await User.create({
        username: "test10",
        email: "test10@gmail.com",
        password: "1",
      });
      const dataPhoto = await Photo.create({
        title: "test",
        caption: "ini foto test",
        image_url: "https://source.unsplash.com/HfIex7qwTlI",
        UserId: dataUser.id,
      });
      const dataPhoto1 = await Photo.create({
        title: "test5",
        caption: "ini foto test5",
        image_url: "https://source.unsplash.com/HfIex7qwTlI",
        UserId: dataUser1.id,
      });
      // generate token
      token = generateToken({
        id: dataUser.id,
        email: dataUser.email,
        username: dataUser.username,
      });
      dataAllPhoto = await Photo.findOne({
        where: {
          id: dataPhoto.id,
          UserId: dataUser.id,
        },
      });
      dataAllPhoto1 = await Photo.findOne({
        where: {
          id: dataPhoto1.id,
          UserId: dataUser1.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  // response berhasil getPhotoById
  it("Should be response 200 (response sukses getPhotoById)", (done) => {
    request(app)
      .get(`/photos/${dataAllPhoto.id}`)
      .set("Authorization", token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("title");
        expect(res.body).toHaveProperty("caption");
        expect(res.body).toHaveProperty("image_url");
        expect(res.body).toHaveProperty("UserId");
        expect(res.body.title).toEqual(dataAllPhoto.title);
        expect(res.body.caption).toEqual(dataAllPhoto.caption);
        expect(res.body.image_url).toEqual(dataAllPhoto.image_url);
        done();
      });
  });
  // response gagal getPhotoById jika data tidak ditemukan (jika mengakses photo dari user lain)
  it("Should be response 404 (Response getPhotoById error data not found jika mengakses Photo dari user lain)", (done) => {
    request(app)
      .get(`/photos/${dataAllPhoto1.id}`)
      .set("Authorization", token)
      .expect(404)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).toEqual("Data tidak ditemukan");
        done();
      });
  });
  // response gagal getPhotoById jika data tidak ditemukan
  it("Should be response 404 (Response getPhotoById error data not found)", (done) => {
    request(app)
      .get(`/photos/${Math.floor(Math.random() * (1000000 - 10000 + 1))}`)
      .set("Authorization", token)
      .expect(404)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).toEqual("Data tidak ditemukan");
        done();
      });
  });

  // response gagal getPhotoByID jika tidak disertakan token
  it("Should be response 401 (Response error getPhotoByID karena tidak menyertakan authentikasi)", (done) => {
    request(app)
      .get(`/photos/${dataAllPhoto.id}`)
      .expect(401)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).toEqual("Token not provided!");
        done();
      });
  });
  afterAll(async () => {
    try {
      await Photo.destroy({ where: {} });
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
});
