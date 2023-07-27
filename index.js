require("./db/config.js");
const User = require("./db/User.js");
const Product = require("./db/Product.js");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ result: "All well Let's go..." });
});

app.post("/register", async (req, res) => {
  let user = new User(req.body); //get data from frontend
  let result = await user.save(); //and save it in user
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server is working on ${port}`);
});

// echo "# fullstack-backend" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Ajayji77/fullst-backend.git
// git push -u origin main
