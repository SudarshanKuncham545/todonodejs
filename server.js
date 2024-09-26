const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const TaskSchema = require("./model");
const cors = require("cors");
const app = express();

dotEnv.config()
const PORT = 5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected Successfully")
   })
.catch((error)=>{
    console.log(`${error}`)
   })

app.use(express.json());


app.post('/addtodo', async(req,res)=>{
    const {todo} = req.body;
    try{
        const newData = new TaskSchema({
            todo: todo
        });
        await newData.save();
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})
   
app.get('/gettodo', async(req, res)=>{
    try{
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})

app.delete('/delete/:id', async(req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err)
    }
})

app.listen(PORT, ()=>{
    console.log(`server start and running at ${PORT}`)
})
