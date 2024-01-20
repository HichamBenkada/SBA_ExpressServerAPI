const express = require("express");
const router = express.Router();

const jokes = require("../data/jokes");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        //provide a user id:
        href: "jokes?userId=<:id>",
        rel: ":id",
        type: "GET",
      },{
        href: "jokes/:id",
        rel: ":id",
        type: "GET",
      },
    ];
    if(req.query.userId){
      const userjokes = jokes.filter((j)=>j.userId===Number(req.query.userId));
      res.json({ userjokes , links })
    }
    else{
      res.json({ jokes, links })
    };
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.tag && req.body.joke) {
      const joke = {
        id: jokes[jokes.length - 1].id + 1,
        userId: req.body.userId,
        tag: req.body.tag,
        joke: req.body.joke,
      };

      jokes.push(joke);
      res.json(jokes[jokes.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const joke = jokes.find((p) => p.id == req.params.id);

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

    if (joke) res.json({ joke, links });
    else next();
  })
  .patch((req, res, next) => {
    const joke = jokes.find((p, i) => {
      if (p.id == Number(req.params.id)) {
        for (const key in req.body) {
          jokes[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (joke) res.json(joke);
    else next();
  })
  .delete((req, res, next) => {
    const joke = jokes.find((p, i) => {
      if (p.id == req.params.id) {
        jokes.splice(i, 1);
        return true;
      }
    });

    if (joke) res.json(joke);
    else next();
  });

//----------------
//possting new joke using a form:
router.route("/new")
.get((req, res) => {
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
  border-radius: 10px;">Submitting a joke: 
  <form action='/api/jokes' method="POST" style="display: flex; flex-direction:column; justify-content:space-around">
  </br>
  userId: <input type="text" name="userId" required/> 
    Tag: <input type="text" name="tag" required/> 
    joke: <textarea id="joke" name="joke" row="4" col="4" required></textarea>
    <br />
    <input type="submit" />
  </form>
</div>`);
})

module.exports = router;
