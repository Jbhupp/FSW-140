var bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const {db} = require('./database');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())

var connection = mysql.createConnection({
    host: 'localhost',
    port: "3306",
    user: 'root',
    password: 'Jansen.02',
    database: 'avengers',
});

connection.connect((err) => {
    if (err){
      throw err;
    }
    console.log('DB connected')
  })

app.get('/getPost', (req, res) => {

    let sqlString = "SELECT * FROM avengers"
    connection.query(sqlString, (err, result) => {
        console.log(connection, 'connection')
        if (err){
            throw err;
        }
        console.log(result)
        res.send(result)
    })
})

function getPost (callback){

    const query = "SELECT * FROM avengers"
    connection.query(query, (err, result) => {
        
        if (err){
            callback(err);
        }
        callback(null, result)
    })
}

app.get('/GetPosts/:url', (req, res) => {
    let sqlString = `SELECT * FROM avengers WHERE url = '${req.params.url}'`
  
    connection.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Item selected successfully!")
    })
  });

app.post('/insertNewPost', (req, res) =>{
    console.log(req.body)

    let row = {
        name: req.body.name,
        url: req.body.url
    }
    let sqlString = "INSERT INTO avengers SET ? "
    connection.query(sqlString, row, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Row added successfully!")
    })
}) 
  
function insertNewPost(name, url, callback){
    const query = `INSERT INTO avengers(name, url) VALUES (${params})`
    const params = [name, url]

    connection.query(query, params, (err, result) => {
        if (err){
            callback(err)
            return;
        }
        callback(null, result.inserturl)
    })
}

app.put('/update/:url', (req, res)=>{
    let newPost = req.body.name
    let sqlString = `UPDATE avengers SET name = '${newPost}' WHERE url = '${req.params.url}'`

    connection.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Item updated successfully!")
    })
})

app.delete('/delete/:url', (req, res)=>{
    
    let sqlString = `DELETE FROM avengers WHERE url = '${req.params.url}'`

    connection.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Item deleted successfully!")
    })
});

const port = process.env.PORT || 8090
app.listen(port, () => {
    console.log(`Listening on ${port}`)
})