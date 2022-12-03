var bodyParser = require('body-parser');


app.get('/GetPosts/:id', (req, res) => {
    let sqlString = `SELECT * FROM posts WHERE PostID = ${req.params.id}`
  
    connection.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Item selected successfully!")
    })
  });
  