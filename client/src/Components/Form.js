import React, { useState }  from 'react'
// import FileBase from 'react-file-base64';
import axios from "axios";

function Form() {

  const [postMemories, setPostMemories]=useState({
    title: '', 
    creator: '',
     message: '', 
     tags: '', 
    //  selected_file: '' 
  })

  const handleSubmit = (e)=> {
    e.preventDefault();
    axios.post("http://localhost:5000/memory", {
      title: postMemories.title, 
      creator: postMemories.creator,
       message: postMemories.message, 
       tags: postMemories.tags, 
      
    }).then(data=> {
      console.log("data", data)
    })
  }
  return (
    <div className="form-container">
      <form onSubmit= {handleSubmit}>
        <h2 style={{textAlign:"center"}}>Create Memories</h2>
        <label>Title:</label>
        <input type="text" name="title" value= {postMemories.title} placeholder="Please type a title" onChange={(e) => setPostMemories({ ...postMemories, title: e.target.value })} ></input>
        
        <label>Creator:</label>
        <input type="text" name="creator" value= {postMemories.creator}  placeholder="Please type a tag with comma seperated" onChange={(e) => setPostMemories({ ...postMemories, creator: e.target.value })} ></input>
        
        <label>Message:</label>
        <input type="text" name="message" value= {postMemories.message}  placeholder="Please type a message" onChange={(e) => setPostMemories({ ...postMemories, message: e.target.value })} ></input>
        
        <label>Tags:</label>
        <input type="text" name="tags" value= {postMemories.tags}  placeholder="Please type a tag with comma seperated"  onChange={(e) => setPostMemories({ ...postMemories, tags: e.target.value })}></input>
        
        {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostMemories({ ...postMemories, selected_file: base64 })} /> */}

        <br/>
        <button>Submit</button>
      </form>
      
    </div>
  )
}

export default Form