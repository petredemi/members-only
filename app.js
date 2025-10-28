const express = require("express");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
let localStrategy = require('passport-local')
const pool  = require('./db/pool')
const {Router} = require("express")
const router = Router()
const routerAppMembers = require("./routers/mainRouter")
const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const {rows} = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];
    
    //console.log(user)

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
    //  if (user.password !== password) {
      //  return done(null, false, { message: "Incorrect password" });
     // }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
          // passwords do not match!
      return done(null, false, { message: "Incorrect password" })
      }

      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];
  //  console.log(user)

    done(null, user);
  } catch(err) {
    done(err);
  }
});
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);
app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    res.redirect("/");
  });
});


app.use('/', routerAppMembers)
//console.log('DATABASE_URL', process.env.DATABASE_URL)

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {

   if (error) {
    throw error;
  }
  console.log(`members only ${PORT}!`);
  
});