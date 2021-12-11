const express= require ('express');
const cors= require ('cors')
const env=require('dotenv')
env.config();
const db= require("./db")



const app=express()
app.use(cors())
app.use(express.json())





app.get("/memories", async (req, res) => {
  try {
    const allMemories = await db.query("SELECT * FROM memories");
    res.json(allMemories.rows);
  } catch (err) {
    console.error(err.message);
  }
});


app.post("/memory",async (req,res) => {
  try {
    const {title,message,tags,creator,selected_file,like_count,created_at}=req.body;
    console.log(req.body)
    const createNewMemory= await db.query ("INSERT INTO memories (title,message,tags,creator,selected_file,like_count,created_at) VALUES($1,$2,$3,$4, $5, $6, $7) RETURNING *", [title,message,tags,creator,selected_file,like_count,created_at])
    res.json(createNewMemory.rows);
  }catch(err) {
    console.error(err.message)
  }

})

app.get("/memory/:id", async (req,res) => {
  try {
    const {id}=req.params
    console.log(req.params)
    const getSingleMemory= await db.query("SELECT * FROM memories WHERE id= $1", [id])
    res.json(getSingleMemory.rows);

  }catch (err) {
    console.log(err)
  }
})

app.put("/memory/:id", async (req,res) => {
  try {
    const {id}=req.params
    const {title,message,tags,creator,selected_file,like_count,created_at}=req.body;
    console.log(req.body)
    const updateMemory= await db.query("UPDATE memories SET title= $1, message=$2, tags=$3 ,creator=$4, selected_file=$5, like_count=$6, created_at=$7 WHERE id=$8 returning *",[title,message,tags,creator,selected_file,like_count,created_at, id])
    res.json(updateMemory.rows);
  }catch (err) {
    console.log(err)
  }
})

app.delete ("/memory/:id", async(req,res)=> {
  try {
    const {id}=req.params;
    const deleteMemory= await db.query ("DELETE FROM memories where id= $1 returning *", [id])
    res.send(deleteMemory.rows)

  } catch (err) {
    console.log(err)
  }
})





app.listen(process.env.PORT_NUMBER || 5000, () => console.log('Example app listening on port 5000!'));