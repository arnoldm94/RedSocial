const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    age: Number,
    role: String,
    commentId: {
      type: ObjectId,
      ref: "Comment",
    },
    tokens: [],
  },
  { timestamps: true }
);
UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  return user;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
