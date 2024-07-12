const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController.js");
const { authentication, isAdmin } = require("../middlewares/authentication");

router.post("/", authentication, PostController.create);
router.put("/id/:_id", authentication, PostController.update);
router.delete("/id/:_id", authentication, PostController.delete);
router.get("/", PostController.getAll);
router.get("/id/:_id", PostController.getById);
router.post("/likes/:_id", authentication, PostController.like);
router.post("/unlikes/:_id", authentication, PostController.unlike);

module.exports = router;
