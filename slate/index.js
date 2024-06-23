const path = require('path')
const express = require('express');
const app = express();
const ejs = require('ejs');
const userModel = require('./models/user');

const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const bcrypt = require('bcrypt');

const noteModel = require('./models/note');
const { title } = require('process');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))

app.get("/", (req, res) => {
    res.render("landingPage");
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post("/login", async (req, res) => {
    let user=await userModel.findOne({email:req.body.email})
    if(!user)
        return res.send("something is wrong");
    else
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(result){
            let token=jwt.sign({email:user.email},"boyismine");
            res.cookie("token",token);
            return res.redirect('/dashboard/'+user.username);    
        }
        else
        return res.send("something is wrong");
    })

})

app.get('/signup', (req, res) => {
    res.render('signup');
})

app.post("/signup", (req, res) => {
    let { username, email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let u = await userModel.create({
                username,
                email,
                password: hash
            })
            res.redirect('dashboard/'+username);
        })
        let token=jwt.sign({email},"boyismine");
        res.cookie("token",token) ;  
    })
})

app.get('/create/:username',(req,res)=>{
    res.render('create',{username:req.params.username});
})

app.post('/create/:username',async (req,res)=>{
let {title,data}=req.body;
let note=await noteModel.create({
    title,
    data
})
res.redirect('/dashboard/'+req.params.username);
// console.log(req.params.username);
})

// get them users:del later
app.get("/user", (req, res) => {
    res.render("user");
})

app.get('/dashboard/:username',async (req,res)=>{
    const notes=await noteModel.find({});
    const user = await userModel.findOne({username: req.params.username });
    // res.send(notes) learnt from this ref
    // console.log(user);
    res.render('dashboard',{username:user.username,notes:notes});
})

app.get('/readmore/:username/:noteTitle',async (req,res)=>{
    let noteData=await noteModel.findOne({
    title:req.params.noteTitle})
    // console.log(noteData);
    res.render('readNote',{title:req.params.noteTitle,data:noteData.data,username:req.params.username});
})

app.get('/delete/:title/:username',async (req,res)=>{
    let note=await noteModel.findOneAndDelete({title:req.params.title});
    res.redirect('/dashboard/'+req.params.username)
})

app.get('/products', (req, res) => {
    res.render('products');
})
app.get('/teams', (req, res) => {
    res.render('teams');
})
app.get('/individuals', (req, res) => {
    res.render('individuals');
})
app.get('/pricing', (req, res) => {
    res.render('pricing');
})
app.get('/privacy', (req, res) => {
    res.render('privacy');
})
// app.get('/logout',(req,res)=>{
//     let token=jwt.sign({email},"boyismine");
//     res.cookie("",token);
//     res.redirect('/');
// })

app.listen(3000);