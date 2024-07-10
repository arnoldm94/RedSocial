const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, "Por favor rellena el cuerpo de tu comentario"],
    },

    userId: {
      type: ObjectId,
      ref: "User",
    },
    postId: {
      type: ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
