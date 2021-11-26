// const db= require("./db")

// export const getMemories=(req,res) => {
//   const allMemories= db.query("SELECT * FROM memories");
//   res.json(allMemories.rows)
// }

// export const createMemory= (req,res) => {
//   const memory=req.body
//   memories.push({...memory})
//   res.send(memories)
// }

// export const getMemory= (req,res) => {
//   const singleMemory= memories.filter((memory)=>
//   memory.id===req.params.id)
//   res.send(singleMemory)

// }

// export const deleteMemory=(req,res) => {
//   memories=memories.filter((memory)=>memory.id != req.params.id)
//   res.send("user deleted")
// }

// export const updateUser= (req,res) =>  {
//   const memory=memories.find((memory)=>memory.id===req.params.id)

//   memory.title=req.body.title;
//   memory.message=req.body.message;
//   memory.tags=req.body.tags;
//   memory.creator=req.body.creator;
//   memory.selected_file=req.body.selected_file;
//   memory.like_count=req.body.like_count;
//   memory.created_At=req.body.created_At;

//   res.send("Updated succesffully")
// }