const Comment = require("../models/Comment.js");
const User = require("../models/Comment.js");
const Post = require("../models/Post.js");

const CommentController = {
  //crear Comment
  async create(req, res) {
    try {
      const comment = await Comment.create({
        body: req.body.body,
        userId: req.user.id,
        postId: req.params._id,
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { commentId: comment._id },
      }),
        await Post.findByIdAndUpdate(req.params._id, {
          $push: { commentId: comment._id },
        }),
        res.send(comment);
    } catch (err) {
      console.error({ message: "algo ha ido mal", err });
    }
  },

  //actualizar Comment
  async update(req, res) {
    try {
      const comment = {
        body: req.body.body,
      };

      await Comment.findOneAndUpdate({ _id: req.params._id }, comment);

      res.send("comment actualizado con éxito");
    } catch (error) {
      console.log(error);
    }
  },

  //borrar comment
  async delete(req, res) {
    try {
      await Comment.findByIdAndDelete({
        _id: req.params._id,
      });
      res.send({ message: "Comment has been removed" });
    } catch (error) {
      console.log(error);
    }
  },

  // ver todos los comentarios
  getAll(req, res) {
    Comment.find({})
      .populate("userId")
      .then((comment) => res.send(comment))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los comentarios",
        });
      });
  },

  //get by id
  async getById(req, res) {
    try {
      const comment = await Comment.findById(req.params._id).populate("userId");
      res.send(comment);
    } catch {
      (err) => {
        console.log(err);
        res.status(500).send({
          message: "Comentario no encontrado",
        });
      };
    }
  },
};
module.exports = CommentController;
