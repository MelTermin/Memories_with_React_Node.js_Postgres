import React, { useState,useContext,useEffect } from 'react'
import axios from "axios";
import {MemoryContext} from '../Context/MemoryContext'
import FileBase from "react-file-base64";
import Background from './Background';
import moment from 'moment';

function Memories() {
  const {details,setDetails}=useContext(MemoryContext)
  const [modalIsOpen, setModalIsOpen]=useState(null);
  const [postMemories, setPostMemories]=useState({
    title: '', 
    creator: '',
     message: '', 
     tags: '', 
     created_at:'',
    selected_file: '' 
  })

 

  const closeModal = () => {
    window.history.back();
}
  useEffect (()=> {
    axios.get("http://localhost:5000/memories").then(response=> {
      console.log(response)
      setDetails(response.data)
    })
   },[details]);
  

   const handleEdit= async (id) => {
    console.log(id)
  
    axios.put(`http://localhost:5000/memory/${id}`, {
      title: postMemories.title, 
      creator: postMemories.creator,
       message: postMemories.message, 
       tags: postMemories.tags, 
       selected_file:postMemories.selected_file,
       created_at: postMemories.created_at,
       
    }).then (response=> {
      console.log("update",response)
      
    })
  
    const newList= details.map((item) => {
      if (item.id === id) {
        item.title = postMemories.title;
        item.creator = postMemories.creator;
        item.created_at = postMemories.created_at;
        item.tags = postMemories.tags;
        item.message = postMemories.message;
        item.selected_file=postMemories.selected_file;
  
    }
        return item;
    });
        setDetails(newList)
        setModalIsOpen(null)
        setPostMemories({
          title: '', 
          creator: '',
           message: '', 
           tags: '', 
           created_at:'',
          selected_file: '' ,
  
        })
  }
  

  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:5000/memory/${id}`)
      .then(response=> {
        console.log("delete-response",response)
        setDetails(
          details.filter((item) => {
            return item.id !== id;
          })
        );
       
      })
    }catch(err) {
  
    }
  }


  return (
<div className="memories-container">
            <div  >
            { details.map((item) => (
            <div   key={item.id}>
            {modalIsOpen===item.id ? (
            <div className="edit-container"  >
              <form className="edit-form">
            <h2 style={{textAlign:"center"}}>Edit Memories</h2>
            
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
        
            <button className="btn-submit"  type="submit" onClick={() => handleEdit(item.id)} > Edit</button>
            <button  className='btn-cancel' onClick={closeModal}>Cancel</button>
            
            </form>
            <Background></Background>
            </div>): (
              
            <div  key= {item.id} className="card">
                <img alt="pictures" className="image" src={item.selected_file}></img>
                      <div className="overlay">
                        <p>{item.creator}</p>
                        <p>{moment(item.created_at).fromNow()}</p>
                      </div>
                    
                    <div className="overlay2">
                      <button onClick= {() =>setModalIsOpen(item.id)}>...</button>
                    </div>
                            
                      <small>{item.tags}</small>
                      <strong>{item.title}</strong>
                      <strong>{item.message}</strong>
                      <button>Like{item.like_count}</button>
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
            )
            }
          </div>
         
            ))}
            
        </div>

</div>
  )
}

export default Memories

