const express = require("express");
const { CheckUser } = require("../controllers/login");
const { InsertVerifyUser, InsertSignUpUser } = require("../controllers/signin");

const router = express.Router();

router.get("/:token", async (req,res) => {
  try{
  const response = await InsertSignUpUser(req.params.token)
  res.status(200).send(response)
  } catch(e){
    console.log(e)
    res.status(500).send(   `<html>
    <body><h4>Registration failed</h4>
    <h5>Unexpected error occured</h5>
    <p>Regards</p>
    <p>Team</p>
    </body>
    </html>`)
  }

});

router.post("/verify", async (req, res) => {
    try{
    const { name, email, password } = await req.body;
    console.log(name, password, email);
    const registercreds = await CheckUser(email);
    if (registercreds === false) {
      await InsertVerifyUser(name, email, password)
      res.status(200).send(true)
    } else if (registercreds == true) {
      res.status(200).send(false);
    } else if (registercreds == "Server Busy") {
      res.status(500).send("Serer Busy");
    }
} catch (e) {
    console.log(e)
}
});

module.exports = router;
