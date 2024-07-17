const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
require("dotenv").config();

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (!user) {
      return res.status(401).send({ message: "No estás autorizado" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error, message: "Ha habido un problema con el token" });
  }
};

const isAdmin = async (req, res, next) => {
  const admins = ["admin", "superadmin"];
  if (!admins.includes(req.user.role)) {
    return res.status(403).send({
      message: "No tienes permisos para ver a todos los usuarios",
    });
  }
  next();
};
const isAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);

    if (post !== 0 && post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "Este Post no es tuyo" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error,
      message: "Ha habido un problema al comprobar la autoría del articulo",
    });
  }
};
const isAuthorComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params._id);

    if (comment !== 0 && comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "Este Comentario no es tuyo" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error,
      message: "Ha habido un problema al comprobar la autoría del articulo",
    });
  }
};

module.exports = { authentication, isAdmin, isAuthor, isAuthorComment };
