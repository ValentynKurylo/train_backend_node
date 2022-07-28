const jwt = require('jsonwebtoken')
const {promisify} = require('util')

const verifyPromese = promisify(jwt.verify)

module.exports = {
    generateTokenPair: ()=>{
        const accessToken = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})

        return{
            accessToken,
            refreshToken
        }
    },
    verifyToken: async (token, tokenType = 'access')=>{
        const secretWord = tokenType === 'access' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
        const verify = await verifyPromese(token, secretWord)
        return verify
    }
}