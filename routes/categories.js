const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories/CategoryController');


/*
    - Get all category
    - GET
    - http://localhost:3001/categories
*/
router.get('/', async (req, res, next) => {
    try {
        const result = await categoryController.getAll();
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Get all category error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/*
    - Get category by id
    - GET
    - http://localhost:3001/categories/id
*/
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await categoryController.getById(id);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Get category by id error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/*
    - Add category
    - POST
    - http://localhost:3001/categories/add
*/

router.post('/', async (req, res, next) => {
    try {
        const result = await categoryController.addCategory(req.body);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Add category error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/*
    - Delete category
    - DELETE
    - http://localhost:3001/categories/delete/id
*/

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) res.status.json('Id trống');

        const result = await categoryController.deleteCategory(id);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Delete category error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/*
    - Update category
    - PUT
    - http://localhost:3001/categories/update/id
*/

router.put('/update/:id', async (req, res, next) => {
    try {
        
        const result = await categoryController.updateCategory(id, req.body);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Update category error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})



module.exports = router;