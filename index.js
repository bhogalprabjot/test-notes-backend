import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import noteRoutes from './routes/notes.js';


const app = express();
dotenv.config();


app.use(bodyParser.json({limit: "30mb", extended: true}));
// app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


// routes start
app.get('/', (req, res)=>{
    res.send("Welcome to notes app");
})
app.use('/notes', noteRoutes);
// routes end



// use %40 instead of @ in password 
// https://www.mongodb.com/docs/atlas/troubleshoot-connection/#special-characters-in-connection-string-password

// const CONNECTION_URL = "mongodb+srv://prabjotsingh:notes-test-app%401234@cluster0.yhclj6a.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewURLParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));

// mongoose.set('useFindAndModify', false);