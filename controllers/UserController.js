const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const UserController = {
  //crear User
  create(req, res, next) {
    req.body.role = "user";
    const password = bcrypt.hashSync(req.body.password, 10);
    User.create({ ...req.body, password: password })
      .then((user) =>
        res.status(201).send({ message: "Usuario creado con éxito", user })
      )
      .catch((err) => {
        err.origin = "usuario";
        next(err);
      });
  },

  //actualizar user
  async update(req, res) {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
      };

      await User.findOneAndUpdate({ _id: req.params._id }, user);

      res.send("User actualizado con éxito");
    } catch (error) {
      console.log(error);
    }
  },
  //borrar User
  async delete(req, res) {
    try {
      await User.findByIdAndDelete({
        _id: req.params._id,
      });
      res.send({ message: "User has been removed" });
    } catch (error) {
      console.log(error);
    }
  },

  // ver todos Users
  getAll(req, res) {
    User.find({})
      .then((users) => res.send(users))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los Usuarios",
        });
      });
  },
  // ver todos Users conectados
  async getConected(req, res) {
    try {
      User.find({}).then((users) => {
        const conectedUsers = [];
        const i = 0;
        users.forEach((user) => {
          if (user.tokens != 0) {
            conectedUsers.push(user.email);
          }
        });
        res.send({
          message:
            "Los siguientes usuarios se encuentran conectados actualmente: ",
          conectedUsers,
        });
      });
    } catch {
      (err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los Usuarios",
        });
      };
    }
  },
  // ver info User conectado
  async getinfo(req, res) {
    try {
      await User.findById({ _id: req.user._id })
        .populate("commentId", "body")
        .populate("postId", "body")
        .populate("mycommentlikes", "body")
        .populate("mypostlikes", "body")
        .then((user) => {
          res.send({
            message:
              "el siguiente usuario se encuentran conectado actualmente: ",
            user,
          });
        });
    } catch {
      (err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los Usuarios",
        });
      };
    }
  },

  //get by id
  async getById(req, res) {
    try {
      const user = await User.findById(req.params._id)
        .populate("commentId", "body")
        .populate("mylikes", "body");
      res.send(user);
    } catch {
      (err) => {
        console.log(err);
        res.status(500).send({
          message: "Usuario no encontrado",
        });
      };
    }
  },

  // buscar User por nombre
  //HECHO PERO FALTA MENSAJE CUANDO NO CONSIGUE USUARIO
  async getOneByName(req, res, next) {
    try {
      const user = await User.findOne(
        { name: req.params.name },
        "name age"
      ).exec();
      res.send(user);
    } catch {
      (err) => {
        console.log(err);
        res.status(500).send({
          message: "Usuario no encontrado",
        });
      };
    }
  },

  //login de usuario
  async login(req, res, next) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      }).then((user) => {
        if (!user) {
          return res
            .status(400)
            .send({ message: "Usuario o contraseña incorrectos" });
        }
        const isMatch = bcrypt.compareSync(req.body.password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .send({ message: "Usuario o contraseña incorrectos" });
        }

        const token = jwt.sign({ _id: user._id }, jwt_secret);
        if (user.tokens.length > 4) user.tokens.shift();
        user.tokens.push(token);
        user.save();
        res.send({ message: "Bienvenid@ " + user.name, token });
      });
    } catch (error) {
      console.error(error);
    }
  },

  //logout de usuario
  async logout(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      }).then((user) => {
        user.tokens = [];
        user.save();
        res.send({ message: "Desconectado con éxito" });
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "hubo un problema al tratar de desconectarte" });
    }
  },
};
module.exports = UserController;
