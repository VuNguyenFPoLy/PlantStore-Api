const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/questions/QuestionController');

/**
 * get all
 * GET
 * http://localhost:3001/questions/
 */

router.get('/', async (req, res, next) => {
    try {
        const result = await QuestionController.getQuestion();
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Get all questions error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * add question
 * POST
 * http://localhost:3001/questions/
 */

router.post('/', async (req, res, next) => {
    try {
        const result = await QuestionController.addQuestion(req.body);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Add question error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * update question
 * POST
 * http://localhost:3001/questions/update/id
 */

router.put('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await QuestionController.updateQuestion(id, req.body);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Update question error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * delete question
 * POST
 * http://localhost:3001/questions/delete/id
 */

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await QuestionController.deteleQuestion(id);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Delete question error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

module.exports = router