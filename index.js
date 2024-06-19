require('dotenv').config();
const path=require('path')
const express=require('express');
const app=express();
const ejs=require('ejs');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'/public')))

app.get("/",(req,res)=>{
    res.render("landingPage");
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post("/logn",(req,res)=>{
    
})

app.get('/signup',(req,res)=>{
res.render('signup');
})

app.get('/products'),(req,res)=>{
    res.render('products');
}
app.get('/teams'),(req,res)=>{
    res.render('teams');
}
app.get('/individuals'),(req,res)=>{
    res.render('individuals');
}
app.get('/pricing'),(req,res)=>{
    res.render('pricing');
}
app.get('/privacy'),(req,res)=>{
    res.render('privacy');
}

app.listen(3000);