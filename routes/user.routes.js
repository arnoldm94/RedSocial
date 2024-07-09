const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const { authentication, isAdmin } = require("../middlewares/authentication");

router.post("/", UserController.create);
router.put("/id/:_id", authentication, UserController.update);
router.delete("/id/:_id", authentication, UserController.delete);
router.get("/", authentication, isAdmin, UserController.getAll);
router.get("/conected", UserController.getConected);
router.get("/myinfo", authentication, UserController.getinfo);
router.get("/id/:_id", UserController.getById);
router.get("/name/:name", UserController.getOneByName);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
