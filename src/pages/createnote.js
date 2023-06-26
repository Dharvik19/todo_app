import React,{useState} from "react";
import Navbar from "./component/NavBar";
import axios from "axios";
const createnote=()=>{

  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
    const todoObj={
      title: title,
      content: content
    }
    // setTitle("");
    // setTodo('');
    console.log(todoObj);
    axios.post('/api/newNote', todoObj)
    .then(()=>{
      alert("todo added");
    })
  }
    return(
        <>
        <Navbar></Navbar>
        <div className="p-4">
        <h2 className='text-center'>Create Note</h2> 
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={(event)=>setTitle(event.target.value)}/>          
          </div>
          <div className="mb-3">
            <label htmlFor="todo" className="form-label">Todo</label>
            <input type="text" className="form-control" id="todo" aria-describedby="emailHelp"  onChange={(event)=>setContent(event.target.value)}/>          
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
        </>
    )
}

export default createnote;