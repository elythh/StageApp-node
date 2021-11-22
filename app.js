const express = require("express");
const app = express();

const axios = require('axios');

app.set('views','./views')
app.set( 'view engine',"ejs")
app.use(express.static(__dirname + '/'));


app.get("/",(req,res) => {
    res.render('home');
});

app.get("/etudiants", (req, res) => {
    try {
        axios.get("http://127.0.0.1:8080/etudiants").then(response => {
            var etudiants = response.data;
            res.render('etudiant',{etudiants: etudiants});
    });
    }
    catch (err) {
        res.render('error');
    }
})

app.get("/offres", (req, res) => {
    res.render('login');
})

app.get("/offres/confirmes", (req, res) => {
    try {
        axios.get("http://127.0.0.1:8080/offres").then(response => {
            var offres = response.data;
            res.render('offres',{offres: offres});
    });
    }
    catch (err) {
        console.log(err)
    }
})

app.post("/offres/admin", (req, res) => {
    console.log(req.headers['content-type']);
    console.log(req.body);
    console.log(req.body.password);
});


app.get("/newStudent",(req,res) => {
    res.render('newStudent');
});

app.get("/newOffer",(req,res) => {
    res.render('newOffer');
});

app.use(function(req, res, next) {
    res.status(404);
    if (req.accepts('html')) {
        res.render('./partials/error', { url: req.url });
        return;
    }
});

app.listen(3000,function(){
    console.log('Server starting on port 3000');
})