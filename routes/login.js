const express = require('express');
const { AuthenticateUser } = require('../controllers/login');
var router = express.Router();
const client = require('../redis')

client.connect().then(() => {
        console.log("connected to redis")
    }).catch((e) => {
        console.log(e);
    });
router.post("/", async (req, res) => {
    const { email, password } = await req.body;
    var loginCredential = await AuthenticateUser(email, password);
    console.log(loginCredential)
    if(loginCredential === "Invalid Username or password"){
        res.status(200).send("Invalid Username or password")
    }else if(loginCredential === "Server Busy") {
        res.status(200).send("Server Busy")
    }else {
        res.status(200).json({token: loginCredential.token});
    }
})

module.exports = router;