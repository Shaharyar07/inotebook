const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
connectToMongo();
const app = express();
app.use(express.json());
const port = 5000;

app.use(cors());

// available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app at http://localhost:${port}`);
});
