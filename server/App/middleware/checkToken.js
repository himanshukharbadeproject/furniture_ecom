let jwt = require('jsonwebtoken');


let checkToken = (req, res, next)=>{
    console.log(req.body)
    console.log(req.headers.authorization)
    try{
        let token = req.headers.authorization.split(" ")[1]
    console.log("TOKEN: " + token)

    let decoded = jwt.verify(token, process.env.TOKENKEY)
    console.log(decoded)

    req.body.userId = decoded.id

    next()

    }
    catch(e){
        console.log(e)
    }
}

module.exports = {checkToken}