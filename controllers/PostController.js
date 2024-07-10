const Post = require("../models/Post.js");
const User = require("../models/User.js");

const PostController = {
  //crear Post
  async create(req, res) {
    try {
      const post = await Post.create({
        body: req.body.body,
        userId: req.user.id,
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { postId: post._id },
      }),
        res.send(post);
    } catch (err) {
      console.error({ message: "algo ha ido mal", err });
    }
  },

  //actualizar Post
  async update(req, res) {
    try {
      const post = {
        body: req.body.body,
      };

      await Post.findOneAndUpdate({ _id: req.params._id }, post);

      res.send("post actualizado con éxito");
    } catch (error) {
      console.log(error);
    }
  },

  //borrar post
  async delete(req, res) {
    try {
      await Post.findByIdAndDelete({
        _id: req.params._id,
      });
      res.send({ message: "Post has been removed" });
    } catch (error) {
      console.log(error);
    }
  },

  // ver todos los posts
  getAll(req, res) {
    Post.find({})
      .populate("userId")
      .populate("comments")
      .then((post) => res.send(post))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los posts",
        });
      });
  },

  //get by id
  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id).populate("userId");
      res.send(post);
    } catch {
      (err) => {
        console.log(err);
        res.status(500).send({
          message: "Comentario no encontrado",
        });
      };
    }
  },
  async like(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $push: { likes: req.user._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { mylikes: req.params._id } },
        { new: true }
      );
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hay un problema con tu solicitud..." });
    }
  },
};
module.exports = PostController;
