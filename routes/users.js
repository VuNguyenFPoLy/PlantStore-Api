var express = require('express');
var router = express.Router();
const userController = require('../controllers/users/UserController')


/*
    - REGISTER
    - POST
    - http://localhost:3001/users/register
    - body: {email: user1@gmail.com, password: user123, name: Nguyễn Văn A}
    - response trả về thông tin nếu thành công, trả về lỗi nếu thất bại
*/

router.post('/register', async (req, res, next) => {
    try {
        const result = await userController.register(req.body);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('Register error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
});

/*
    - LOGIN
    - POST
    - http://localhost:3001/users/login
    - body: {email: user1@gmail.com, password: user123}
    - response trả về thông tin nếu thành công, trả về lỗi nếu thất bại
*/

router.post('/login', async (req, res, next) => {
    try {
        const result = await userController.login(req.body);
        res.status(200).json({ status: true, data: result });

    } catch (error) {
        console.log('Login error: ', error.message);
        res.status(500).json({ status: false, message: error.message })
    }
})

/*
    - UPDATE
    - PUT
    - http://localhost:3001/users/update
    - body: {email: user1@gmail.com, password: user1234}
    - response trả về thông tin nếu thành công, trả về lỗi nếu thất bại
*/

router.put('/update', async (req, res, next) => {
    try {
        const result = await userController.update(req.body);
        res.status(200).json(result);

    } catch (error) {
        console.log('Update error: ', error.message);
        res.status(500).json({ message: error.message })
    }
})





module.exports = router;

