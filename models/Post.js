const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, "Por favor rellena el cuerpo de tu post"],
    },

    userId: {
      type: ObjectId,
      ref: "User",
    },
    likes: [{ type: ObjectId, ref: "User" }],
    commentId: [{ type: ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
