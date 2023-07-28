require("./db/config");
const Product = require("./db/Product.js");
const User = require("./db/User.js");
const PORT = 5000;
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ result: `Working let's go` });
});

//register
app.post("/register", async (req, res) => {
  const user = await new User(req.body);
  const result = await user.save();
  console.log(result);
  res.send(result);
});

//login
app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      console.log(user + " Welcome");
      res.send(user);
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "please enter email and password correctly" });
  }
});

//add-product
app.post("/add-product", async (req, res) => {
  const product = await new Product(req.body);
  const result = await product.save();
  console.log(result);
  res.send(result);
});

//delete product
app.delete("/product/:id", async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

//
app.get("/product/:id", async (req, res) => {
  console.log(req.params);
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    console.log(result);
    res.send(result);
  } else {
    res.send({ result: "No Record Found" });
  }
});

//update product
app.put("/product/:id", async (req, res) => {
  console.log(req.params);
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

// serch product
app.get("/search/:key", async (req, res) => {
  console.log(req.params);
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server run on ${PORT}`);
});
// echo "# fullstack-backend" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Ajayji77/fullstack-backend.git

// git remote add origin https://github.com/Ajayji77/fullstack-frontend.git
// git push -u origin main

// continues commit of fullstack backend code
