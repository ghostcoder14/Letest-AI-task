import express from 'express'
import dotenv from 'dotenv'
import app from './app.js';


dotenv.config(
    {
        path:'.env'
    }
)



const PORT = process.env.PORT ;


app.listen(PORT, ()=>{
     console.log(`The server is running on the ${PORT}`)
})

