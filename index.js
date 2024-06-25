const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Model/TodoModel')
require('dotenv').config();



const app = express();
app.use(cors());
app.use(express.json())

// let uri = "mongodb+srv:chiomaubaezuonu102:testtodo@cluster0.3vf3ykq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const MONGO_URI = process.env.MONGO_URI; // Access environment variable

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error(err));

// mongoose.connect(uri)

// get request
app.get('/get', (req, res) => {
TodoModel.find()
.then(result => res.json(result))
.catch(err=> res.json(err))
})

//update request
app.put('/put/:id', (req,res) => {
   const  {id} = req.params;
     TodoModel.findByIdAndUpdate({_id : id}, {done: true})
     .then(result => res.json(result))
     .catch(err => res.json(err))
})

//for delete request
app.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .then(err => res.json(err))
})




// for post request
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
})

app.listen(3001, () => console.log('app running on port 3001'))