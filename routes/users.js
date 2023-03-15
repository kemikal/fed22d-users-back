var express = require('express');
var router = express.Router();
const fs = require("fs");
const crypto = require("crypto-js");
const { ObjectId } = require("mongodb");

//const salt = "guinea pigs are awesome";

let users = [
  {id: 1, name: 'John', likes: "Odla, Kaniner, långa promenader"},
  {id: 2, name: 'Jane', password: "test"},
  {id: 3, name: 'Bob'},
  {id: 4, name: 'Alice'},
  {id: 5, name: 'Bengt'}
]

/* GET users listing. */
router.get('/', function(req, res, next) {

  req.app.locals.db.collection("users").find().toArray()
  .then(result => {
    console.log("result from GET users", result);
    res.json(result)
  })

  // res.json(users);
  // fs.readFile("users.json", function(err, data){
  //   if(err) {
  //     console.log(err)
  //   }
  //   res.send(data)
  //   return;
  // })
});

router.get('/:userId', function(req, res, next) {
  userId = req.params.userId;
  console.log(userId);

  req.app.locals.db.collection("users").findOne({"_id": new ObjectId(userId)})
  .then(result => {
    console.log("Hitta user", result);

    res.json(result)
  })

  // let findUser = users.find(user => user.id == userId);
  // res.json(findUser);
});

router.post('/', function(req, res, next) {
  let newUser = { name: req.body.name };
  let passwordToSave = crypto.SHA3(req.body.password).toString();
  newUser.password = passwordToSave;

  console.log("new user", newUser);

  req.app.locals.db.collection("users").insertOne(newUser)
  .then(result => {
    console.log("result från db", result);
    res.json(result);
  })

  // fs.readFile("users.json", function(err, data){
  //   if(err) {
  //     console.log(err)
  //   }
  //   let users = JSON.parse(data)
  //   newUser.id = users.length + 1;
  //   let passwordToSave = crypto.SHA3(req.body.password).toString();
  //  // let passwordToSave = crypto.AES.encrypt(req.body.password, salt).toString();
  //   newUser.password = passwordToSave;
  //   users.push(newUser);
  //   fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err) {
  //     if(err) {
  //       console.log(err)
  //     }
  //     res.json(users)
  //   })
  // })
});

router.post('/many', function(req, res, next) {
  let newUsers = req.body;
  //let passwordToSave = crypto.SHA3(req.body.password).toString();
  //newUser.password = passwordToSave;

  console.log("new user", newUsers);

  req.app.locals.db.collection("users").insertMany(newUsers)
  .then(result => {
    console.log("result från db", result);
    res.json(result);
  })

  // fs.readFile("users.json", function(err, data){
  //   if(err) {
  //     console.log(err)
  //   }
  //   let users = JSON.parse(data)
  //   newUser.id = users.length + 1;
  //   let passwordToSave = crypto.SHA3(req.body.password).toString();
  //  // let passwordToSave = crypto.AES.encrypt(req.body.password, salt).toString();
  //   newUser.password = passwordToSave;
  //   users.push(newUser);
  //   fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err) {
  //     if(err) {
  //       console.log(err)
  //     }
  //     res.json(users)
  //   })
  // })
});

router.post('/login', function(req, res, next) {
  const { name, password } = req.body;
  fs.readFile("users.json", function(err, data){
    if(err) {
      console.log(err)
    }
    let users = JSON.parse(data);
    const foundUser = users.find(user => user.name === name);
    if(crypto.SHA3(password).toString() === foundUser.password) {
   // if(password === crypto.AES.decrypt(foundUser.password, salt).toString(crypto.enc.Utf8)) {
      res.status(201).json({name: foundUser.name, id: foundUser.id})
    }
    else {
      res.status(401).json("Incorrect password or username")
    }
    return;
  }
  )
  

  
});

router.get('/test', function(req, res, next) {
  res.send('test routen');
});

module.exports = router;
