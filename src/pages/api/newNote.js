import Note from "../../../model/Note";
const mongoose = require('mongoose');

async function handler(req, res){
    if(req.method !== 'POST'){
        return res.status(405).end();
    }
    try{
        const {title, content} = req.body;
        await mongoose.connect('mongodb://127.0.0.1:27017/todos',{
            useNewUrlParser : true,
        }).then(()=> console.log('DB connected'));
        const newNote = new Note({title, content})
        await newNote.save();
        console.log(newNote);
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }finally{
        mongoose.connection.close();
    }
}

export default handler;