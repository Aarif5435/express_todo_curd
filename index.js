const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req,res)=>{
    fs.readFile("./todo.json", "utf-8", (err,data)=>{
        res.send(data);
    });
});

app.post("/", (req,res)=>{
    fs.readFile("./todo.json", "utf-8", (err,data)=>{
        const parsed = JSON.parse(data);
        parsed.todo = [...parsed.todo, req.body];

        fs.writeFile("./todo.json", JSON.stringify(parsed), {encoding: "utf-8"}, ()=>{
            res.send("todo created");
        })
    })
});


app.put("/:id", (req,res)=>{
    const {id} = req.params;
    fs.readFile("./todo.json", "utf-8", (err,data)=>{
        const parsed = JSON.parse(data);
        parsed.todo = parsed.todo.map((el)=>{
            if(el.id == id){
                el.status = "true";
            };
            return el;
        });
        fs.writeFile("./todo.json", JSON.stringify(parsed), {encoding:"utf-8"},()=>{
            res.send("todo updated");
        })
    })
});

app.delete("/:id", (req,res)=>{
    const {id} = req.params;
    fs.readFile("./todo.json", "utf-8", (err,data)=>{
        const parsed = JSON.parse(data);
        parsed.todo = parsed.todo.filter((el)=>el.id != id);

        fs.writeFile("./todo.json", JSON.stringify(parsed), {encoding:"utf-8"},()=>{
            res.send("todo deleted");
        })
    })
})

app.listen(8080,()=>{
    console.log("listenig at 8080");
})