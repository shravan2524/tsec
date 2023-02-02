const http = require('http');
const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
const User = require("./models/User");
const Flats = require("./models/Flats");
const { query } = require('express');

// Connection URI
const url = "mongodb+srv://shravan:ravilata@cluster0.yyer7.mongodb.net/project1?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database connected');
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  let items = req.body.data;
  console.log(items, "af");
  const newUser = new User({
    name: items.name,
    email: items.email,
    password: items.password,
  });
  console.log(newUser);
  newUser.save()
    .then((newUser) => {
      console.log("Record inserted");
      res.send("Success");
    })
    .catch((err) => console.log(err));
})

app.get("/flats", (req, res) => {
  Flats.find()
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err))
})

app.post("/login", (req, res) => {
  let { items } = req.body.data;
  let query = { email: req.body.data.email, password: req.body.data.password };
  console.log(query);
  User.find(query)
    .then((users) => {
      console.log(users, "shravan");
      if (users.length>0) {
        console.log("rignt matched");
        res.send({mes : users});
      }
      else {
        let mes = "username / password is wrong";
        console.log("abc", users.length);
        res.send({ mes: mes });
      }
    })
    .catch(err => console.log(err));
})

app.post("/flatid", (req, res) => {
  let items = req.body;
  Flats.findById(items.data)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err))
})


app.post("/intrested", (req, res) => {
  let items = req.body;
  const { id, username } = req.body;
  console.log(username, id);
  const query = { email: username };
  User.findOne(query)
    .then((data) => {
      const tempintrested = data.intrested;
      tempintrested.push(id);
      console.log(tempintrested);
      User.updateOne(query, { intrested: tempintrested })
        .then((e) => {
          res.send(tempintrested);
        })
        .catch((err) => console.log(err));
    })
    .catch(err => console.log(err));
})


app.listen(PORT, () => {
  console.log(`running at ${PORT}`);
})