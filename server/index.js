require('dotenv').config()
const express = require('express')
const cors = require('cors')
//const { Pool } = require('pg')
const { todoRouter } = require('./routes/todo.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', todoRouter)

const port = process.env.PORT

/*const openDb = () => {
    const pool= new Pool ({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    })
    
    return pool;
}*/
app.listen(port)