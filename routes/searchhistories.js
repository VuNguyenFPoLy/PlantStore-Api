const express = require('express');
const router = express.Router();
const searchHistoryController = require('../controllers/searchhistories/SearchHistoryController');

/**
 * - Get all
 * - GET
 * - http://localhost:3001/searchhistories/
 */

router.get('/', async (req, res, next) => {
    try {
        const result = await searchHistoryController.getAll();
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Get all search history error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
});

/**
 * - Add search history
 * - POST
 * - http://localhost:3001/searchhistories
 */

router.post('/', async (req, res, next) => {
    try {
        const result = await searchHistoryController.addSearchHistory(req.body);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Add search history error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * - Delete search history
 * - DELETE
 * - http://localhost:3001/searchhistories/delete/id
 */

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await searchHistoryController.deleteSearchHistory(id);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Delete search history error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

module.exports = router;