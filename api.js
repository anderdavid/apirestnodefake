var express = require('express');
var http = require('http');
const pool = require('./conexion');
var body_parser = require('body-parser');

var app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));


var users =['oscar','juan','marcos']

app.post('/autenticacion',(req,res)=>{
  
  console.log(req.body);
  
  var query ="SELECT *FROM user u WHERE u.email ='"+req.body.email+"' AND u.password ='"+req.body.password+"'";
  var response =null;
  pool.query(query, (error, user) => {
    if (error) throw error;
    console.log(user+" "+user.length)
    if(user.length<=0){
      response ={isSuccessful:"false",message:"Invalid email or password"}
    }else{
      response ={isSuccessful:"true",message:"Login Successful",user:user[0]}
    }
    res.send(JSON.stringify(response)); 
  });


})


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