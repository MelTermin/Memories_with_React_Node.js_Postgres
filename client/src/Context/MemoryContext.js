import React, { useState, createContext } from "react";

export const MemoryContext= createContext();

export const MemoryContextProvider = (props) => {
  
  const [details,setDetails] = useState([]);
  
  const addMemoryItem= (detail) => {
    setDetails([...details,detail])
  }

  
  
  return (
    <MemoryContext.Provider
      value={{
        details:details,
        setDetails:setDetails,
        addMemoryItem
      }}
    >
      {props.children}
    </MemoryContext.Provider>
  );
};