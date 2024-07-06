const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config");

app.use(express.json());
dbConnection();
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

app.use("/user", require("./routes/user.routes"));
