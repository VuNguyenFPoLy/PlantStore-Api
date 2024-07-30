const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notifications/NotificationController');

/**
 * Create notification
 * POST
 * http://localhost:3001/notifications
 */
router.post('/', async (req, res, next) => {
    try {
        const result = await notificationController.createNotification(req.body);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Create notification error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
});

/**
 * Get by id user
 * GET
 * http://localhost:3001/notifications/idUser/:idUser
 */
router.get('/iduser/:idUser', async (req, res, next) => {
    try {
        const idUser = req.params.idUser;
        const result = await notificationController.getNotification(idUser);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Get notification error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})


module.exports = router;