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
        connectionString:process.env.DATABASE_URL,
        ssl:true
    }
})

const app = express();

//use cors for give resource to other web
app.use(cors());

//get req from front-end
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

// '/' --> It's work
app.get('/',(req,res)=>{ res.send(`it's working`)})

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


app.listen(process.env.PORT || 3000,()=>{
    console.log(`Port ${process.env.PORT} is using by smart-brain-api`);
})