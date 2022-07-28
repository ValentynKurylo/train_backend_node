const router = require('express').Router()

const trainController = require('../controllers/trainController')

router.get('', trainController.getAllTrain)

router.get('/from/:fromTown', trainController.getTrainByFromTown)

router.get('/to/:toTown', trainController.getTrainByToTown)

router.get('/from/:fromTown/to/:toTown', trainController.getTrainByFromTownAndToTown)

router.get('/data/:data', trainController.getTrainByData)

router.get('/from/:fromTown/to/:toTown/data/:d', trainController.getTrainByFromTownAndToTownAndDate)

router.post('', trainController.postTrain)

router.put('/:id', trainController.putTrain)

router.delete('/:id', trainController.deleteTrain)

module.exports = router