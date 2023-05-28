require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
app.use(express.static("public"));

app.use(
  cors({
    origin: "http://localhost:3000",
    exposedHeaders: ["Access-Control-Allow-Origin"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cookie",
      "Access-Control-Allow-Origin",
    ],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_KEY, //dotenv here
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const notesSchema = new mongoose.Schema({ title: String, content: String });

const userSchema = new mongoose.Schema({
  id:String,
  username: String,
  password: String,
  notes: [notesSchema],
});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", userSchema);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      // callbackURL: "http://localhost:3000/home",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      // passReqToCallback: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      const googleUser = await User.findOne({ id: profile.id });
      if (googleUser) {
        return done(null, profile);
      } else {
        const newUser = new User({ id: profile.id });
        await newUser.save();
        return done(null, profile);
      }
    }
  )
);

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.use(User.createStrategy());

app.post("/api/auth/signup", async (req, res) => {
  try {
    User.register({ username: req.body.username }, req.body.password);
    res.status(200).send("succesfully registered");
  } catch (error) {
    res.status(500).send("There was an error");
  }
});

app.post("/api/auth/login", passport.authenticate("local"), async (req, res) => {
 if(req.isAuthenticated()){
  const user =await User.findById(req.user._id ) || await User.findOne({id: req.user.id})
   res.status(200).send("Logged in succesfully")
 }else{
    res.status(405).send("failed to login")
  }
});

app.post("/api/auth/logout", async (req, res) => {
  if (req.isAuthenticated()) {
    req.logOut(() => {
      res.status(200).send(true);
    });
  } else {
    res.status(405).send(false);
  }
});

app.post("/notes/add", async (req, res) => {
  if (req.isAuthenticated()) {
    const user =await User.findById(req.user._id ) || await User.findOne({id: req.user.id})
    await user.notes.push({
      title: req.body.title,
      content: req.body.content,
    });
    await user.save();
    res.status(200).send("Note added succesfully");
  } else {
    res.status(401).send("Not logged in");
  }
});

app.get("/notes", async (req, res) => {
  if (req.isAuthenticated()) {
    const user =await User.findById(req.user._id ) || await User.findOne({id: req.user.id});
    res.status(200).json(user.notes);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

app.get("/notes/:noteId", async (req, res) => {
  if (req.isAuthenticated()) {
    const user =await User.findById(req.user._id ) || await User.findOne({id: req.user.id});
    user.notes.forEach((note) => {
      if (note._id == req.params.noteId) {
        res.status(200).json(note);
      }
    });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

app.put("/notes/:noteId", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const user =await User.findById(req.user._id ) || await User.findOne({id: req.user.id});
      user.notes.map(async (note) => {
        if (note._id == req.params.noteId) {
          note.title = req.body.title;
          note.content = req.body.content;
          await user.save();
          res.status(200).send("Note updated succesfully");
        }
      });
    } else {
      res.status(401).send("Not logged in");
    }
  } catch (error) {
    res.status(500).send("There was an error");
  }
});

app.delete("/notes/:noteId", async (req, res) => {
  if (req.isAuthenticated()) {
    const user =await User.findById(req.user._id ) || await User.findOne({id: req.user.id});
    const note = user.notes.pull({ _id: req.params.noteId })
    await user.save();
    res.status(200).send(note);
  } else {
    res.status(401).send("Not logged in");
  }
});

app.get("/authentication", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send(true);
  } else {
    res.status(401).send(false);
  }
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/home",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.listen(5000, () => {
  console.log("server running on port 5000");
});
