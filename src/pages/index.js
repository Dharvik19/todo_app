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
              <h3>{note.title}</h3>
             <h3>{note.content}</h3>
              </div>
             <button className='btn btn-warning m-1'>Edit</button>
             <button className='btn btn-danger m-1'>Delete</button>
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