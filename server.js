const express = require('express');
const app = express();
const PORT = 3000;
//_--_---__----____-----

//Routes:
const jokes = require('./routes/jokes');
const users = require('./routes/users');

//error handler
const error = require('./utilities/error');

//view engine:
app.set('view engine','ejs');

//static styles
app.use(express.static('./styles'));

//Parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// Custom Logger Middleware
app.use((req, res, next) => {
    const time = new Date();
    console.log( `-----
      ${time.toLocaleTimeString()}: A ${req.method} '${req.url}' request has been received.`);

    if (Object.keys(req.body).length > 0) {
      console.log('Containing the data:');
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });

// Redirecting to routes handlers
app.use('/api/users', users);
app.use('/api/jokes', jokes);

//JokesAPI Server Base URL
app.get('/' , (req,res) => {
  res.render('index')
});

// Adding some HATEOAS links.
app.get('/api', (req, res) => {
  res.json({
    links: [
      {
        href: 'api/users',
        rel: 'users',
        type: 'GET',
      },
      {
        href: 'api/users',
        rel: 'users',
        type: 'POST',
      },
      {
        href: 'api/jokes',
        rel: 'jokes',
        type: 'GET',
      },
      {
        href: 'api/jokes',
        rel: 'jokes',
        type: 'POST',
      },
    ],
  });
});

// Custom 404 (not found) middleware.
app.use((req , res , next)=>{
    res.status(404).render('404')
})
//any other error
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

//_--_---__----____-----
app.listen(PORT, ()=>{
    console.log(`Server waiting for calls on ${PORT}`)
})