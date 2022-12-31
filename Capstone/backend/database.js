const mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Jansen.02',
  database: 'Project'
})

function createPost(title, description, image_url, callback) {

    const query = `
    INSERT INTO posts (title, description, image_url)
    VALUES (?, ?)
    `
  
    const params = [title, description, image_url]
  
    connection.query(query, params, (error, result) => {
      if (error) {
        callback(error)
        return
      }
      callback(null, result.insertId)
    })
  }

  function getPost(callback){
    const query = `SELECT * FROM posts`

    connection.query(query, params, (error, result) => {
      if (error) {
        callback(error)
        return
      }
      callback(null, result.insertId)
    })
  }

  exports.createPost = createPost
  exports.getPost = getPost
  