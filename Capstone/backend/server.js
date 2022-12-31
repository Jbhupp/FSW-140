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
    database: 'Project',
});

connection.connect((err) => {
    if (err){
      throw err;
    }
    console.log('DB connected')
  })

app.get('/getPost', (req, res) => {

    let sqlString = "SELECT * FROM ProjectTable"
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

    const query = "SELECT * FROM ProjectTable"
    connection.query(query, (err, result) => {
        
        if (err){
            callback(err);
        }
        callback(null, result)
    })
}

app.get('/GetPosts/:id', (req, res) => {
    let sqlString = `SELECT * FROM ProjectTable WHERE PostID = ${req.params.id}`
  
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
        description: req.body.description,
        image_url: req.body.image_url
    }
    let sqlString = "INSERT INTO ProjectTable SET ? "
    connection.query(sqlString, row, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Row added successfully!")
    })
}) 
  
function insertNewPost(description, image_url, callback){
    const query = `INSERT INTO ProjectTable(description, image_url) VALUES (${params})`
    const params = [description, image_url]

    connection.query(query, params, (err, result) => {
        if (err){
            callback(err)
            return;
        }
        callback(null, result.insertID)
    })
}

app.put('/update/:id', (req, res)=>{
    let newPost = " "
    let sqlString = `UPDATE ProjectTable SET description = ${newPost} WHERE postID = ${req.params.id}`

    connection.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Item updated successfully!")
    })
})

app.delete('/delete/:id', (req, res)=>{
    
    let sqlString = `DELETE FROM ProjectTable WHERE postID = ${req.params.id}`

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