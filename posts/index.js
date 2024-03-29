const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto"); // Used to generate random id's
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}; //where we will store posts locally

app.get("/posts", async (req, res) => {
  const res1 = await axios.get("http://localhost:4002/events");
  res.status(200).send(res1);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex"); //generate random id
  const { title } = req.body; //get title from request body

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]); //send back the post that was created
});

app.post("/events", (req, res) => {
  console.log("Recieved Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
