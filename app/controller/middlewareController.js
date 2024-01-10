var jwt = require('jsonwebtoken');

const middlewareController = {
    generateToken: (infoUser) => {
        const expiredTime = '5m'
        const accessToken = jwt.sign(infoUser, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: expiredTime,
        });
        return accessToken
    },
    isAccessToken: (req, res, next) => {
        try {
            const accessToken = req.headers['authorization']
            if(!accessToken) return res.status(403).json({message: 'Authentication is required'})
            
            const token = accessToken.split(' ')[1]
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            req.user = user
            next()
        } catch (error) {
            res.status(403).json({message:'Invalid Token'})
        }
    }
}

module.exports = middlewareController