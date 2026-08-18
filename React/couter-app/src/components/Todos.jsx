import React from 'react'

export function Todos({todos}){

    async function Marksascompleted(_id){
        const res = await fetch("http://localhost:3000/completed", {
        method: "PUT",
        body: JSON.stringify({_id:_id}),
        headers: {"Content-Type": "application/json"},
      });
      
      if (!res.ok) {
        throw new Error("Failed to mark todo completed");
      }
        
    }

    return <div>
        {todos.map(function(todo){
            return <div key={todo._id} style={{border:"1px solid white",margin:"10px",padding:"10px"}}>
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                {/* <p>{todo}</p> */}
                <button onClick={()=>{
                    Marksascompleted(todo._id)
                }}>{todo.completed == true ? "completed":"Marks as completed"}</button>
            </div>
        })}
    </div>
}