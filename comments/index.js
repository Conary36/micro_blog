const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {}; // Key with value of an array of comments

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || []; //If comments is undefined, set it to an empty array

  comments.push({ id: commentId, content }); //Push the comment into the array

  commentsByPostId[req.params.id] = comments; // Set the commentsByPostId to the comments array

  await axios.post('http://localhost:4005/events', {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id
    }

  })

  res.status(201).send(comments); // Send the comments array back to the client
});

app.post("/events", (req, res) => {
  console.log("Event Recieved", req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log("Server is running on port 4001");
});
