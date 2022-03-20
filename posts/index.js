const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');// Used to generate random id's

const app = express();

app.use(bodyParser.json());

const posts = {};//where we will store posts locally

app.get('/posts', (req, res) => {
    res.send(posts); //send back all posts that are created
});

app.post('/posts',(req, res)=>{
    const id = randomBytes(4).toString('hex');//generate random id
    const { title } = req.body;//get title from request body

    posts[id] = { 
        id,
        title
    }

    res.status(201).send(posts[id]);//send back the post that was created
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});