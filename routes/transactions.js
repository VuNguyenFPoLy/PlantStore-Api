const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactions/TransactionController');

/**
 * - Get all
 * - GET
 * - http://localhost:3001/transactions
 */
router.get('/', async (req, res, next) => {
    try {
        const result = await transactionController.getAllTransaction();
        if (result) res.status(200).json({ status: true, data: result });
        return null;
    } catch (error) {
        console.log('Get all transaction error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * Get by id user
 * - GET
 * - http://localhost:3001/transactions/idUser/:idUser
 */
router.get('/idUser/:idUser', async (req, res, next) => {
    try {
        const idUser = req.params.idUser;
        const result = await transactionController.getTransaction(idUser);
        if (result) res.status(200).json({ status: true, data: result });
        return null;
    } catch (error) {
        console.log('Get transaction error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
});

/**
 * - Add transaction
 * - POST
 * - http://localhost:3001/transactions
 */
router.post('/', async (req, res, next) => {
    try {
        const result = await transactionController.createTransaction(req.body);
        if (result) res.status(200).json({ status: true, data: result });
        return null;
    } catch (error) {
        console.log('Add transaction error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

module.exports = router