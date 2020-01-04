var express = require('express')
var http = require('http')
var app = express()
const pool = require('./conexion')

var users =['oscar','juan','marcos']

app.get('/user/:id', (req, res) => {
    
  res.send("id "+req.params.id)
})

app.get('/users', (req, res) => {
    
    pool.query('SELECT *FROM user', (error, result) => {
        if (error) throw error;
        res.send(result);
    });
})
app.post('/user', function (req, res) {
  res.send('POST request to the homepage')
})

app.put('/user/:id', function (req, res) {
    res.send('PUT request to the homepage '+req.params.id)
})
app.delete('/user/:id', function (req, res) {
    res.send('DELETE request to the homepage '+req.params.id)
})


app.get('/', (req, res) => {
  res.status(200).send("Welcome to API REST")
})


http.createServer(app).listen(8001, () => {
  console.log('Server started at http://localhost:8001');
});