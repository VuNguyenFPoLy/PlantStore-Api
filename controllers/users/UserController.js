// const { users } = require('../../routes/users');
const userModel = require('./UserModel')
const bcryptjs = require('bcryptjs');
const sendMail = require('../../bin/helper/Mailer')

// Register
const register = async (data) => {
    console.log(data)
    try {
        const { email, password, name, phone } = data;

        const REGEX_EMAIL = /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/;
        const REGEX_PHONE = /^[0-9]{10}$/;
        const REGEX_PASSWORD = /^[a-zA-Z0-9_.+-@]{6,}$/;

        if (!name || !email || !phone || !password) throw new Error('Thông tin trống');
        if (name.length < 3) throw new Error('Tên quá ngắn');
        if (!REGEX_EMAIL.test(email)) throw new Error('Email không đúng định dạng');
        if (!REGEX_PHONE.test(phone)) throw new Error('Số điện thoại không đúng định dạng');
        if (password.length < 6) throw new Error('Mật khẩu quá ngắn');
        if (!REGEX_PASSWORD.test(password)) throw new Error('Mật khẩu không đúng định dạng');

        // check email in db
        let user = await userModel.findOne({ email: email });
        if (user) {
            throw new Error('Email đã tồn tại')
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);


        // create new user
        user = new userModel({
            email: email,
            password: hashPassword,
            name: name,
            phone: phone
        })

        const detailsMail = {
            name: name,
            mail: email,
            subject: 'Success register account'
        }

        await sendMail(detailsMail);

        const result = await user.save();
        console.log(result);

        return result;

    } catch (error) {
        console.log('Register error: ', error.message);
        throw new Error('Đăng ký thất bại')
    }
}

// Login
const login = async (data) => {
    try {
        const { email, password, phone } = data;
        let user;
        if (email) user = await userModel.findOne({ email: email });
        if (phone) user = await userModel.findOne({ phone: phone });

        if (!user) throw new Error('Email hoặc số điện thoại chưa được đăng ký');

        const checkPass = await bcryptjs.compare(password, user.password);

        if (checkPass) {
            const { password: _, ...userData } = user._doc; // Sử dụng destructuring để loại bỏ trường password
            return userData;
        }

        throw new Error('Sai mật khẩu');

    } catch (error) {
        console.log('Login error: ', error.message);
        throw new Error('Đăng nhập thất bại');
    }
}

// Update
const update = async (_id, password, name, phone, avatar) => {
    try {

        let user = await userModel.findById(_id);
        if (!user) throw new Error('Email không tồn tại');

        user.password.toString() === password.toString ? null : user.password = password;
        user.name.toString() === name.toString() ? null : user.name = name;
        user.phone.toString() === phone.toString() ? null : user.phone = phone;
        user.avatar === avatar ? null : user.avatar = avatar;
        user.updateAt = Date.now();

        const result = await user.save();
        const { password: _, ...userUpdate } = result._doc; // Sử dụng destructuring để loại bỏ trường password
        return userUpdate;
    } catch (error) {
        console.log('Update error: ', error.message);
        throw new Error('Cập nhật thất bại');
    }
}

module.exports = { register, login, update };