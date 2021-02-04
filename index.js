const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/spectacles", require("./spectacles"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Wild Circus !" });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
