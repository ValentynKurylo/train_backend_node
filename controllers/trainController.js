const connection = require('../DataBase/mySQL')

module.exports = {
    getAllTrain: async (req, res)=>{
        let data = await connection.query(`SELECT * FROM train`)
        res.json(data[0])
    },
    getTrainByFromTown: async (req, res)=>{
        let from = req.params.fromTown
        let data = await connection.query(`SELECT * FROM train WHERE train.fromTown = "${from}" order by data`)
        res.json(data[0])
    },
    getTrainByToTown: async (req, res)=>{
        let to = req.params.toTown
        let data = await connection.query(`SELECT * FROM train WHERE train.toTown = "${to}" order by data`)
        res.json(data[0])
    },
    getTrainByFromTownAndToTown: async (req, res)=>{
        let from = req.params.fromTown
        let to = req.params.toTown
        let data = await connection.query(`SELECT * FROM train WHERE train.fromTown="${from}" and train.toTown="${to}" order by data`)
        res.json(data[0])
    },
    getTrainByData: async (req, res)=>{
        let d = req.params.data
        let data = await connection.query(`SELECT * FROM train WHERE train.data = "${d}" order  by train.time`)
        res.json(data[0])
    },
    getTrainByFromTownAndToTownAndDate: async (req, res)=>{
        let from = req.params.fromTown
        let to = req.params.toTown
        let d = req.params.d
        let data = await connection.query(`SELECT * FROM train WHERE train.fromTown="${from}" and train.toTown="${to}"  and train.data="${d}" order  by train.time`)
        res.json(data[0])
    },
    postTrain: async (req, res) => {
        let body = req.body
        let data = await connection.query(`INSERT into train(fromTown, toTown, data, time, price)
                                           values ("${body.fromTown}", "${body.toTown}", "${body.data}", "${body.time}", "${body.price}")`)
        res.json('train was added')
    },
    putTrain: async (req, res) => {
        let id = req.params.id
        let body = req.body
        let data = await connection.query(`UPDATE train
                                           SET fromTown = "${body.fromTown}",
                                               toTown   = "${body.toTown}",
                                               data     = "${body.data}",
                                               time     = "${body.time}",
                                               price    = "${body.price}"
                                           WHERE train.id = "${id}"`)
        res.json('train was updated')
    },
    deleteTrain: async (req, res)=>{
        let id = req.params.id
        let data = await connection.query(`DELETE FROM train WHERE train.id = "${id}"`)
        res.json("train was deleted")
    }

}