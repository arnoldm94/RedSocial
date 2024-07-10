const express = require("express");
const app = express();
const PORT = 3001;
const { dbConnection } = require("./config/config");
const { typeError } = require("./middlewares/errors");

app.use(express.json());
dbConnection();

app.use("/user", require("./routes/user.routes"));
app.use("/comment", require("./routes/comment.routes"));
app.use("/post", require("./routes/post.routes"));

app.use(typeError);
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
