require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const cors = require("cors");

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

mongoose.connect(
  process.env.MONGO_URI
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  notes: [{ title: String, content: String }],
});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     cb(null, user);
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });

app.post("/api/auth/signup", async (req, res) => {
  try {
    await User.register({ username: req.body.username }, req.body.password);
    res.status(200).send("succesfully registered");
  } catch (error) {
    res.status(500).send("There was an error");
  }
});

app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
  try {
    res.status(200).json({ message: "You've logged in succesfully" });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/api/auth/logout", async (req, res) => {
  try {
    req.logOut(() => {
      res.status(200).send("logged out succesfully");
    });
  } catch (error) {
    res.status(405).send("failed to logout");
  }
  // if (req.isAuthenticated()) {
  //   req.logOut(()=>{
  //     res.status(200).send(true);
  //   });
  // } else {
  //   res.status(405).send(false);
  // }
});

app.post("/notes/add", async (req, res) => {
  if (req.isAuthenticated()) {
    const userIs = req.user;
    const yourNotes = {
      title: req.body.title,
      content: req.body.content,
    };
    await userIs.notes.push(yourNotes);
    await userIs.save();
    res.status(200).send("Note added succesfully");
  } else {
    res.status(401).send("Not logged in");
  }
});

app.get("/notes", async (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user.notes);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

app.get("/notes/:noteId", async (req, res) => {
  if (req.isAuthenticated()) {
    // req.params.noteId
    const user = req.user.notes;
    user.forEach((note) => {
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
    if(req.isAuthenticated()){
      const notes = req.user.notes;
       notes.map(async (note) => {
        if(note._id == req.params.noteId){
          note.title = req.body.title;
          note.content = req.body.content;
          await req.user.save();
          res.status(200).send("Note updated succesfully");
        }
       })
  } else{
    res.status(401).send("Not logged in");
  }
  } catch (error) {
    res.status(500).send("There was an error");
  }
 
})

app.delete("/notes/:noteId", async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const noteId = req.params.noteId;
    await user.notes.pull({ _id: noteId });
    await user.save();
    res.status(200).send("Note deleted succesfully");
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

app.listen(5000, () => {
  console.log("server running on port 5000");
});
