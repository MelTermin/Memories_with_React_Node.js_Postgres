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




app.listen(process.env.PORT_NUMBER || 5000, () => console.log('Example app listening on port 5000!'));