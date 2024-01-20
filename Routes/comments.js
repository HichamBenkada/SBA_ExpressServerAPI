const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        //provide a user id:
        href: "comments/:id",
        rel: ":id",
        type: "GET",
      },
    ];
    res.json({ comments, links });
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.jokeId && req.body.content) {
      const comment = {
        id: comments[comments.length - 1].id + 1 || 1 ,
        userId: req.body.userId,
        jokeId: req.body.jokeId,
        body: req.body.content,
      };

      comments.push(comment);
      res.json(comments);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const comment = comments.find((c) => c.id == req.params.id);

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

    if (comment) res.json({ comment, links });
    else next();
  })
  .patch((req, res, next) => {
    const comment = comments.find((p, i) => {
      if (p.id == Number(req.params.id)) {
        for (const key in req.body) {
          comments[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (comment) res.json(comment);
    else next();
  })
  .delete((req, res, next) => {
    const comment = comments.find((p, i) => {
      if (p.id == req.params.id) {
        comments.splice(i, 1);
        return true;
      }
    });

    if (comment) res.json(comment);
    else next();
  });

//----------------
//possting new comment using a form:
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
  border-radius: 10px;">Submitting a comment: 
  <form action='/api/comments' method="POST" style="display: flex; flex-direction:column; justify-content:space-around">
  </br>
  userId: <input type="text" name="userId" required/> 
    JokeId: <input type="text" name="jokeId" required/> 
    Comment: <textarea id="content" name="content" row="4" col="4" required></textarea>
    <br />
    <input type="submit" />
  </form>
</div>`);
})

module.exports = router;
