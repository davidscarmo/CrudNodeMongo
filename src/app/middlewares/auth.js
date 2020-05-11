const jwt = require('jsonwebtoken'); 

const authConfig = require('../../config/auth.json'); 

module.exports = (req, res, next) => 
{
    const authHeader = req.headers.authorization; 

    if(!authHeader)
        return res.status(401).send({ error: 'No token privided'}); 
    
    const parts = authHeader.split(' '); 

    if(!parts.length === 2)
        return res.status(401).send({error: 'Token error'}); 
    
    const [scheme, token] = parts; 

    if(!/^Bearer$/i.test(scheme)) //Regex. Checks if scheme starts with the word 'Bearer'. i = case sensitive  
        return res.status(401).send({error: 'Token malformatted'}); 
    
    jwt.verify(token, authConfig.secret, (err, decoded) =>
    {
        if(err)
            return res.status(401).send({error: 'Token Invalid'}); 
        req.userId = decoded.id; 
        return next(); 
    });     
}