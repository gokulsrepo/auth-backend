const express = require('express');
const { AuthorizeUser } = require('../controllers/login');
var router = express.Router();

router.get("/", async (req, res) => {
   try{
    const auth_token = await req.headers.authorization
    const loginCredential = await AuthorizeUser(auth_token)
    if(loginCredential === false){
        res.status(200).send("Invalid token")
    }else {
        res.status(200).json(loginCredential)
    }
   }catch(e){
    console.log(e)
   }
    
})


module.exports = router;