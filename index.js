const express = require("express");
const app = express();
const PORT = 3001;
const { dbConnection } = require("./config/config");

app.use(express.json());
dbConnection();
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

app.use("/user", require("./routes/user.routes"));
app.use("/comment", require("./routes/comment.routes"));
