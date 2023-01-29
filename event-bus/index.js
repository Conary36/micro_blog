const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = []; //Event Store in real world is more complex than this

app.post('/events', (req, res)=>{
    const event = req.body;

    events.push(event); // Add event to event store


    axios.post('http://localhost:4000/events', event).catch(err => console.log(err.message));
    axios.post("http://localhost:4001/events", event).catch(err => console.log(err.message));
    axios.post("http://localhost:4002/events", event).catch(err => console.log(err.message));
    axios.post("http://localhost:4003/events", event).catch(err => console.log(err.message));

    res.send({status: 'OK'}); // Send OK to client
});

app.get('/events', (req, res) => {
    res.send(events) // Send all events to client
})

app.listen(4005, () =>{
    console.log('Listening on 4005');
});