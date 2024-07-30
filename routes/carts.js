const express = require('express');
const router = express.Router();
const cartController = require('../controllers/carts/CartController');

/**
 * - Add cart
 * - POST
 * - http://localhost:3001/carts
 */

router.post('/user/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await cartController.createCart(id, req.body);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Add cart error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * - Update cart
 * - Put
 * - http://localhost:3001/carts/update/:id
 */

router.put('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await cartController.updateCart(id, req.body);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Update cart error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * - Delete one cart
 * - Delete
 * - http://localhost:3001/carts/delete/:id
 */

router.delete('/delete/:userID/:cartID', async (req, res, next) => {
    try {
        const { userID } = req.params;
        const cartID = req.params.cartID || req.query.cartID;
        const result = await cartController.deleteCart(userID, cartID);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Delete cart error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * delete all carts by user id
 * - Delete
 * - http://localhost:3001/carts/delete/all/:idUser
 */
router.delete('/all/delete/:idUser', async (req, res, next) => {
    try {
        const { idUser } = req.params;
        const result = await cartController.deleteAllCarts(idUser);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Delete all cart error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * - Get cart
 * - Get
 * - http://localhost:3001/carts/user/:id
 */

router.get('/user/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await cartController.getCart(id);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Get cart error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

module.exports = router