const router = require("express").Router();
const PhotoRouter = require("./PhotoRouter");
const UserRouter = require("./UserRouter");
const { authentication } = require("../middlewares/auth");

router.use("/photos", authentication, PhotoRouter);
router.use("/users", UserRouter);

module.exports = router;
