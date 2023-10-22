const router = require("express").Router();
const PhotoController = require("../controllers/PhotoController");

router.get("/", PhotoController.getAllData);
router.post("/", PhotoController.createData);
router.get("/:id", PhotoController.getDataById);
router.put("/:id", PhotoController.updateDataById);
router.delete("/:id", PhotoController.deleteData);

module.exports = router;
