const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");
const dotenv = require("dotenv");

// const { requiresAuth } = require('express-openid-connect');

dotenv.config();



const app = express();
const port = 3000;

// aut0 config
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUERBASEURL
}
// using the auth0 configs
app.use(auth(config));
app.get("/", (req, res) => {
    const isAuthenticated = req.oidc.isAuthenticated();
    if (isAuthenticated) {
        const user =req.oidc.user ;
        res.send(`
      
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Welvome To App (${user.name})</h1>
    <img src="${user.picture}" alt="">
   <a href="http://localhost:3000/logout"><button  >Logout</button></a> 
</body>
</html>
      
      
      
      `);
    } else {
        res.send(`
      
        <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
     <a href="http://localhost:3000/login"><button>Login</button></a> 
  </body>
  </html>
        
        
        
        `);
    }
});

app.get("/profile", requiresAuth(), (req, res) => {
    console.log(req.oidc.user);
    res.send(req.oidc.user);
})


// listening the server
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

