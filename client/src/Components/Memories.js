import React, { useState,useContext,useEffect } from 'react'
import axios from "axios";
import {MemoryContext} from '../Context/MemoryContext'
import moment from 'moment';

function Memories() {
  const {details,setDetails}=useContext(MemoryContext)

  const [postMemories, setPostMemories]=useState({
    title: '', 
    creator: '',
     message: '', 
     tags: '', 
     created_at:'',
    selected_file: '' 
  })

  const [singleMemo,setSingleMemo]=useState();
  useEffect (()=> {
    axios.get("http://localhost:5000/memories").then(response=> {
      console.log(response)
      setDetails(response.data)
    })
   },[]);
  
//    const {id}=useParams()


//    useEffect(()=> {
//      if(id){
//        getSingleMemory(id)
//      }
//    },[id])

//  const getSingleMemory=async(id) => {
//   const response= await axios.get(`http://localhost:5000/memory/${id}`)
//    setSingleMemo(...response.data[0])
//  }

   
  //  const handleEdit = (id) =>  {
  //    console.log(id)
  //    axios.put(`http://localhost:5000/memory/${id}`,{

  //    }).then(data=> {
  //     console.log(data)
  //    })
  //  }

  const handleEdit= async (id) =>{
    console.log(id)

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
 
{
        details.map((item) => {
          return (//dont forget to return it Melissa!!//
          <div  key= {item.id} className="card">
            <img className="image" src={item.selected_file}></img>

            <div className="overlay">
              <p>{item.creator}</p>
              <p>{moment(item.created_at).fromNow()}</p>
            </div>

            <div className="overlay2">
              <button onClick= {() => handleEdit(item.id)}>...</button>
            </div>
            <small>{item.tags}</small>
            <strong>{item.title}</strong>
            <strong>{item.message}</strong>
            <button>Like{item.like_count}</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
           
            
            
          
          
          </div>)
        })
      }

</div>
  )
}

export default Memories

