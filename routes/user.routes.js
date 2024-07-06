const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const { authentication } = require("../middlewares/authentication");

router.post("/", UserController.create); //HECHO
router.put("/id/:_id", authentication, UserController.update); //HECHO
router.delete("/id/:_id", authentication, UserController.delete); //HECHO
router.get("/", authentication, UserController.getAll);
router.get("/id/:_id", UserController.getById);
router.get("/name/:name", UserController.getOneByName);
router.post("/login", UserController.login); //HECHO
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
