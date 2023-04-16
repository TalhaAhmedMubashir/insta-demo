const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  //console.log("REQ JWT: ",req.body)
  if (req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.API_SECRET, (err, data) => {
      //console.log("My token verify : ",data)
      if (err || data.email !== req.body.email) {
        //console.log("Internal email : ",data.email, " rec email :",req.body.email)
        return res.sendStatus(403)
      }
      next();
    });
  }
}
