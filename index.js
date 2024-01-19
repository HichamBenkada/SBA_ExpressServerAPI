const express = require('express');
const app = express();
const PORT = 3000;
//_--_---__----____-----

//view engine


//JokesAPI Server Base URL
app.get('/' , (req,res) => {
    res.send('Welcome to My JOKES API')
})


app.listen(PORT, ()=>{
    console.log(`Server waiting for calls on ${PORT}`)
})