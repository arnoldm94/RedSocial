const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController.js");
const { authentication, isAdmin } = require("../middlewares/authentication");

router.post("/postid/:_id", authentication, CommentController.create);
router.put("/id/:_id", authentication, CommentController.update);
router.delete("/id/:_id", authentication, CommentController.delete);
router.get("/", CommentController.getAll);
router.get("/id/:_id", CommentController.getById);

module.exports = router;
