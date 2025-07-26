const express = require('express');
const { GetAllData, getUsers, userDelete } = require('../controllers/Dashboard.js');
const { isAdmin } = require('../middleware/isAdmin.js'); 

const dashboardRouter = express.Router();

dashboardRouter.get('/', GetAllData);
dashboardRouter.get('/users', isAdmin, getUsers);
dashboardRouter.delete('/delete/:id', userDelete);
module.exports = dashboardRouter;
