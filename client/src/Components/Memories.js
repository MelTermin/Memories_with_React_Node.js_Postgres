import React, { useState,useContext,useEffect } from 'react'
import axios from "axios";
import {MemoryContext} from '../Context/MemoryContext'

function Memories() {
  const {details,setDetails}=useContext(MemoryContext)

  useEffect (()=> {
    axios.get("http://localhost:5000/memories").then(response=> {
      console.log(response)
      setDetails(response.data)
    })
   },[]);

  return (
<div className="memories-container">
 
{
        details.map((item) => {
          return (//dont forget to return it Melissa!!//
          <div  key= {item.id} className="card">
            <img className="image" src={item.selected_file}></img>
            <p>{item.title}</p>
            <p>{item.message}</p>
            
          
          
          </div>)
        })
      }

</div>
  )
}

export default Memories

