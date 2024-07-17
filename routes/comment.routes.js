const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController.js");
const { authentication, isAuthorComment } = require("../middlewares/authentication");

router.post("/postid/:_id", authentication, CommentController.create);
router.put("/id/:_id", authentication, isAuthorComment, CommentController.update);
router.delete("/id/:_id", authentication, isAuthorComment, CommentController.delete);
router.get("/", CommentController.getAll);
router.get("/id/:_id", CommentController.getById);
router.post("/likes/:_id", authentication, CommentController.like);
router.post("/unlikes/:_id", authentication, CommentController.unlike);

module.exports = router;
