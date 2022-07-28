const router = require('express').Router()

const userController = require('../controllers/userController')

router.get('', userController.getAllUsers)

router.get('/current/:email', userController.getCurrentUser)

router.post('', userController.postUser)

router.post('/auth', userController.auth)

router.put('/:id', userController.putUser)

router.delete('/:id', userController.deleteUser)

module.exports = router