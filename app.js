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
        console.log(err)
    }
})

app.get("/offres", (req, res) => {
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

app.get("/newStudent",(req,res) => {
    res.render('newStudent');
});

app.get("/newOffer",(req,res) => {
    res.render('newOffer');
});

app.listen(3000,function(){
    console.log('Server starting on port 3000');
})