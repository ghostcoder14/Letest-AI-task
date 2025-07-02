import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config(
    {
        path:'.env'
    }
)

const app = express();

const PORT = process.env.PORT ;

app.get('/', (req,res)=>{
    res.send("API is running");
})

app.listen(PORT, ()=>{
     console.log(`The server is running on the ${PORT}`)
})

