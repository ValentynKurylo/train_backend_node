const connection = require('../DataBase/mySQL')
const helper = require('../helpers/passwordHelper')
const authHelper = require('../helpers/tokenHelper')

module.exports = {
    getAllUsers: async (req, res)=>{
        let data = await connection.query(`SELECT id, name, email FROM user`)
        res.json(data[0])
    },
    postUser: async (req, res)=>{
        let body = req.body
        let hashPassword = await helper.hash(body.password)
        body.password = hashPassword
        let data = await connection.query(`INSERT into user(name, email, password) values("${body.name}", "${body.email}", "${body.password}")`)
        res.json('user was added')
    },
    auth: async (req, res)=>{
        let body = req.body
        let user = await connection.query(`SELECT *
                                               FROM user
                                               WHERE user.email = "${body.email}"`)

        if(!user[0][0]){
            throw new Error("Wrong email or password")
            res.json('Wrong email or password')
        }

        await helper.compare(user[0][0].password, body.password)
        let tokenPair = authHelper.generateTokenPair()
        res.json(tokenPair)
        await connection.query(`INSERT into auth (accessToken, refreshToken, userId) values ("${tokenPair.accessToken}", "${tokenPair.refreshToken}", "${user[0][0].id}")`)

    },
    putUser: async (req, res) => {
        let id = req.params.id
        let body = req.body
        let hashPassword = await helper.hash(body.password)
        body.password = hashPassword
        let data = await connection.query(`UPDATE user
                                           SET name="${body.name}",
                                               email="${body.email}",
                                               password="${body.password}",
                                               role="${body.role}"
                                           WHERE user.id = "${id}"`)
        res.json('user was updated')
    },
    deleteUser: async (req, res)=>{
        let id = req.params.id
        let data = await connection.query(`DELETE FROM user WHERE user.id="${id}"`)
        res.json('user was deleted')
    },
    getCurrentUser: async (req, res, next)=>{
        try{
            let email = req.params.email
            let user = await connection.query(`SELECT *
                                               FROM user
                                               WHERE user.email = "${email}"`)

            if(!user[0][0]){
                throw new Error("Wrong email or password")
                //res.json('Wrong email or password')
            }
            res.json(user[0])
        }
        catch (e){
            next(e)
        }
    }
}