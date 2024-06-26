const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Model/TodoModel')
require('dotenv').config();



const app = express();
app.use(cors());
app.use(express.json())


const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error(err));

 
  
 

// get request
app.get('/todos', (req, res) => {
TodoModel.find()
.then(result => res.json(result))
.catch(err=> res.json(err))
})

//update request
app.put('/todos/:id', (req,res) => {
   const  {id} = req.params;
     TodoModel.findByIdAndUpdate({_id : id}, {done: true})
     .then(result => res.json(result))
     .catch(err => res.json(err))
})

//for delete request
app.delete('/todos/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .then(err => res.json(err))
})




// for post request
app.post('/todos', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
})

app.listen(5000, () => console.log('app running on port 5000'))