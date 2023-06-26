// import { MongoClient} from 'mongodb';
import  Head  from 'next/head';
import { Fragment,useState } from 'react';
import axios from 'axios';
import Navbar from './component/NavBar';
export async function getStaticProps(){
  const mongoose = require("mongoose")
  const Note = require("../../model/Note.js")

  await mongoose.connect('mongodb://127.0.0.1:27017/todos', {
    useNewUrlParser: true,
  }).then(() => console.log("DB CONNECTED"))

  const notes = await Note.find().sort({createdAt: 'desc'})
  console.log(notes)
  return {
    props: {
      notes: JSON.parse(JSON.stringify(notes))
    }
  }
}
function HomePage({notes}){

  const[visibility, setVisibility] = useState(false);
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [noteId,setNoteId] = useState('');
  const [completed, setCompleted] = useState(false);
  const editForm = (title, content, noteId) => {
    setVisibility(visibility => !visibility)
    setTitle(title)
    setContent(content)
    setNoteId(noteId)
  }

  const updateNote = async(noteId)=>{
    const noteObj = {
      title: title,
      content: content
    }
    console.log(noteObj);

    await axios.put(`api/updateNote?id=${noteId}`,noteObj)
    .then(()=>{
      window.location.reload(false);
    })
  }
  const deleteNote = (noteId) => {
    axios.delete(`/api/deleteNote?id=${noteId}`).then(() => {
      window.location.reload(false)
    })
  }
  const toggleTodo = async(noteId)=>{
    const noteObj = {
      completed : !completed
    }
    console.log(noteObj);
  }
  return (
    <Fragment>
    <Head>
      <title>TO Do</title>
      <meta
        name='description'
        content='Browse a huge list of highly active React meetups!'
      />
    </Head>
    <Navbar></Navbar>
    <>
      <div  className='container'>
        <h1 className='mt-2 mb-2'>TO-dos</h1>
        <ul style={{backgroundColor:"black",listStyle:"none", padding:"10px",borderRadius:"10px"}}>
        {notes.map((note,i)=>{
          return(
            <li key={i}style={{backgroundColor:"red",borderRadius:"10px",padding:"10px",marginBottom:"10px"}}>
              <div className='m-1'>
              <h3 style={{textDecoration: completed ? '':'line-through'}}>{note.title}</h3>
             <h3>{note.content}</h3>
              </div>
              <button onClick={(title, content, noteId)=>editForm(note.title, note.content, note._id)} className="btn btn-info">Edit</button>
             <button onClick={() => deleteNote(note._id)}className='btn btn-danger m-1'>Delete</button>
             {/* <button type='checkbox' onClick={()=> toggleTodo(noteId)}>completed</button> */}
             {visibility && <div>
                <h2>Update now</h2>
                <form >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={(event)=>setTitle(event.target.value)}/>          
          </div>
          <div className="mb-3">
            <label htmlFor="todo" className="form-label">Todo</label>
            <input type="text" className="form-control" id="todo" aria-describedby="emailHelp"  onChange={(event)=>setContent(event.target.value)}/>          
          </div>
          <button type="submit" onClick={()=> updateNote(noteId)} className="btn btn-info">Edit</button>
          <button type="submit" className="btn btn-danger">Cancel</button>
        </form>
             </div>
             }
            </li>
          )
        })}
        </ul>
      </div>
    </>
  </Fragment>
  )
}

export default HomePage;