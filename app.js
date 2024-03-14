const express = require("express");
const morgan =require("morgan");

const app=new express();
app.use(morgan('dev'));
app.use(express.json());


//in momory storage for task
let tasks=[];
//route to get all task
app.get('/',(req,res)=>{
    res.json(tasks);
})

//route to create a new task
app.post('/tasks',(req,res)=>{
    const task =req.body
    tasks.push(req.body);
    res.send({message:"taske added",tasks})
})

//route to get a task by id
app.get('/tasks/:id',(req,res)=>{
const id = req.params.id;
console .log(id)
const task = tasks.find(task=>task.id===id);
if(!task){
    res.send("task not found");
}else{
    res.json(task)
}
});
//update
app.put('/tasks/:id',(req,res)=>{
    const id =req.params.id;
    const updatedTask = req.body;
    const index = tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Task not found")
    }else{
        tasks.splice(index,1,updatedTask);
        //
        res.json(tasks)
    }
})


//delete
app.delete('/tasks/:id',(req,res)=>{
    const id =req.params.id;
    
    const index = tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Task not found")
    }else{
        tasks.splice(index,1);
        //
        res.json(tasks)
    }
})







app.listen(3005,(req,res)=>{
    console.log("port is up")
});