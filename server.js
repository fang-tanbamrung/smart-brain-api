const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/login');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

//create variable to connect to database
const db = knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'password',
        database:'smart-brain'
    }
})

const app = express();

//use cors for give resource to other web
app.use(cors());

//get req from front-end
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

// '/' --> It's work
app.get('/',(req,res)=>{ res.send(database.users);})

// '/signin' --> POST = sucess/fail
app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)});

// '/register' --> POST = user
app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)});

// '/profile/:userId' --> GET = user
app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)});

// '/image' --> PUT = user
app.put('/image',(req,res) => {image.handleImage(req,res,db)});

// '/imageUrl' --> POST =  
app.post('/imageUrl',(req,res) => {image.handleImageUrl(req,res)});


app.listen(3001,()=>{
    console.log('Port 3001 is using by smart-brain-api');
})