import React, { useState,useContext }  from 'react'
import FileBase from "react-file-base64";
import axios from "axios";
import {MemoryContext} from '../Context/MemoryContext'

function Form() {

  const [postMemories, setPostMemories]=useState({
    title: '', 
    creator: '',
     message: '', 
     tags: '', 
     like_count:0,
     created_at:'',
    selected_file: '' 
  })

  const {addMemoryItem}=useContext(MemoryContext);

  const [isSubmitted, setIsSubmitted]=useState(false);

  const handleSubmit = (e)=> {
    e.preventDefault();
    
    setIsSubmitted(true)
    axios.post("http://localhost:5000/memory", {
      title: postMemories.title, 
      creator: postMemories.creator,
       message: postMemories.message, 
       tags: postMemories.tags, 
       selected_file:postMemories.selected_file,
       created_at: postMemories.created_at,
     
      
    }).then(data=> {
      console.log("data", data)
      addMemoryItem(data.data)
      setPostMemories({
        title: '', 
        creator: '',
         message: '', 
         tags: '', 
         created_at:'',
        selected_file: '' ,

      })
      setIsSubmitted(false)
    })
  }

  
  return (
    <div className="form-container">
      <form onSubmit= {handleSubmit}>
        <h2 style={{textAlign:"center"}}>Create Memories</h2>
        <label>Title:</label>
        <input type="text" name="title" value= {postMemories.title} placeholder="Please type a title" onChange={(e) => setPostMemories({ ...postMemories, title: e.target.value })} ></input>
        
        <label>Creator:</label>
        <input type="text" name="creator" value= {postMemories.creator}  placeholder="Please type a creator name" onChange={(e) => setPostMemories({ ...postMemories, creator: e.target.value })} ></input>
        
        <label>Message:</label>
        <input type="text" name="message" value= {postMemories.message}  placeholder="Please type a message" onChange={(e) => setPostMemories({ ...postMemories, message: e.target.value })} ></input>
        
        <label>Tags:</label>
        <input type="text" name="tags" value= {postMemories.tags}  placeholder="Please type a tag with comma seperated"  onChange={(e) => setPostMemories({ ...postMemories, tags: e.target.value })}></input>
        
        <label>Date:</label>
        <input type="date" value={postMemories.created_at} name="created_at" onChange={(e) => setPostMemories({ ...postMemories, created_at: e.target.value })}></input>
        
       <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostMemories({ ...postMemories, selected_file: base64 })} /> 

        <br/>
       
       {!isSubmitted && <button className="btn-submit">Submit</button>}
       {isSubmitted && <button disabled className="btn-disabled">Adding Memory...</button>}
       
      </form>
      
    </div>
  )
}

export default Form
