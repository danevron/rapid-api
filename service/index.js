const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const passport = require("passport");
const passportJWT = require("passport-jwt");
let users = require('./users');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'd694e21a-d81e-42eb-8827-b1381415a63a';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);
const app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(passport.initialize());

app.post("/login", function(req, res) {
  let user = null

  if(req.body.username && req.body.password){
    const username = req.body.username;
    const password = req.body.password;
    user = users[_.findIndex(users, { username: username })];
  }

  if (!user) {
    res.status(401).json({message:"no such user found"});
  }

  if(user.password === req.body.password) {
    const payload = {id: user.id, name: user.name};
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});

app.post("/profile", passport.authenticate('jwt', { session: false }), function(req, res){
  req.user.profile_image_location = req.body.profile_image_location
  res.status(200).json(_.omit(req.user,['password']));
});

app.get("/profile", passport.authenticate('jwt', { session: false }), function(req, res){
  res.status(200).json(_.omit(req.user,['password']));
});

app.listen(8080, function() {
  console.log("server running on http://localhost:8080");
});
