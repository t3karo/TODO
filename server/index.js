const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = 3001

app.get('/',(req,res) => {
    const pool = openDb()

    pool.query('select * from task', (error, result) => {
        if (error) {
            res.status(500).json({error: error.message})
        }
        res.status(200).json(result.rows)
    })
})

const openDb = () => {
    const pool= new Pool ({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'sql123',
        port: 5432
    });
    
    return pool;
}
app.post('/new', (req, res) => {
    const pool = openDb();

    pool.query("INSERT INTO task (description) VALUES ($1) returing *",
     [req.body.description],
     (error, result) => {
        if(error) {
            res.status(500).json({error: error.message})
        } else {
            res.status(201).json({id : result.rows[0].id})
        }
    })
})

app.delete("/delete/:id", async(req, res) => {
    const pool = openDb()
    const id=parseInt(req.params.id)

    pool.query('DELETE FROM task WHERE id = $1',
    [id],
    (error, result) => {
        if(error) {
            res.status(500).json({error: error.message})
        } else {
            res.status(200).json(id:id)
        }
    })
})


app.listen(port)