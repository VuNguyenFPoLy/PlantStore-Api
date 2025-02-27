var express = require('express');
var router = express.Router();
const productController = require('../controllers/products/ProductController');


/*
    - Get all
    - GET
    - http://localhost:3001/products/
*/
router.get('/', async (req, res, next) => {
    try {
        const result = await productController.getAllProduct();
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Get all product error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/**
    - Get product by name
    - GET
    - http://localhost:3001/products/65fc1f7c6b4392b40b055b8d

*/

router.get('/name/:name', async (req, res, next) => {
    try {
        const { name } = req.params;
        const result = await productController.getProductByName(name);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Get product by name error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/*
    - Get product by id
    - GET
    - http://localhost:3001/products/65fc1f7c6b4392b40b055b8d
*/

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await productController.getProductById(id);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Get product by id error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
});

/*
    - Get product by page
    - GET
    - http://localhost:3001/products/page/1
    - show 10 products per page
*/
router.get('/page/:page', async (req, res, next) => {
    try {
        const { page } = req.params;
        const result = await productController.getProductsByPage(page);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Get product by page error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

router.get


/*
    - Add product
    - POST
    - http://localhost:3001/products
    - body: {
        name: Spider Plant ,
          category: category1,
          type: Ưa bóng,
           price: 250.000,
            size: nhỏ,
             brand: Châu phi,
              quantity: 10,
               description: description1,
                image: https://res.cloudinary.com/duhkl1iel/image/upload/v1710990802/planta/plants/wjktxnuk3m3ayq7oqtfe.png
            }
*/

router.post('/', async (req, res, next) => {
    try {
        const result = await productController.addProduct(req.body);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Add product error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/*
    - Update product
    - PUT
    - http://localhost:3001/products/update/id
    - body: {
        name: Spider Plant 1 ,
          category: category1,
          type: Ưa bóng,
           price: 250.000,
            size: nhỏ,
             brand: Châu phi,
              quantity: 10,
               description: description1,
                image: https://res.cloudinary.com/duhkl1iel/image/upload/v1710990802/planta/plants/wjktxnuk3m3ayq7oqtfe.png
            }
*/

router.put('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await productController.updateProduct(id, req.body);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Update product error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/*
    - Delete product
    - DELETE
    - http://localhost:3001/products/delete/id
    
*/

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await productController.deleteProduct(id);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Delete product error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

module.exports = router;