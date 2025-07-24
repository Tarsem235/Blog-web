const express = require('express')
const getSinglepost = require('../controllers/publicController')

const publicRoute = express.Router()

publicRoute.get('/singlepost/:id' , getSinglepost)

module.exports= publicRoute