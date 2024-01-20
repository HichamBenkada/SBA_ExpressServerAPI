const express = require("express");
const router = express.Router();

const users = require("../data/users");
const jokes = require("../data/jokes");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "users/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ users, links });
  })
  .post((req, res, next) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        next(error(409, "Username Already Taken"));
      }

      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      users.push(user);
      res.json(user);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (user) res.json({ user, links });
    else next();
  })
  .patch((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.send(user);
    else next();
  })
  .delete((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.send("User has successfully deleted! ", user);
    else next();
  });

router
  .get("/login", (req, res) => {
    res.send(`<style>
    body{
      display:flex;
      justify-content:center;
      algne-items:center;
    }
    </style>
    <div style="margin:auto;
    padding: 10px;
    width:50%;
    background-color:rgb(0 0 255 / 10%);
    border-radius: 10px;">New User: 
    <form action='/api/users' method="POST" style="display: flex; flex-direction:column; justify-content:space-around">
    </br>
    <input type="text" name="name" placeholder="Enter your name" required/></br> 
    <input type="text" name="username" placeholder="Enter your username" required/></br> 
    <input type="email" name="email" placeholder="Enter your email"required/></br> 

      <br />
      <input type="submit" />
    </form>
  </div>`);
  })
  .get('/:id/jokes',(req,res, next)=>{
    const user = users.find((u)=>u.id === Number(req.params.id))
    if(user){
      const userJokes = jokes.filter((p)=>p.userId === Number(req.params.id))
      res.json(userJokes);
    }else res.status(404).send('user not found')
  })

module.exports = router;
