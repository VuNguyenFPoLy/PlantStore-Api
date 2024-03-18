const userModel = require('./UserModel')

// Register
const register = async (email, password, name) => {
    try {
        // check email in db

        let user = await userModel.findOne({ email: email });

        if (user) {
            throw new Error('Email đã tồn tại')
        }
        // create new user
        user = new userModel({
            email: email,
            password: password,
            name: name
        })

        const result = await user.save();
        console.log(result);

        return result;

    } catch (error) {
        console.log('Register error: ', error.message);
        throw new Error('Đăng ký thất bại')
    }
}

// Login
const login = async (email, password) => {
    try {
        let user = await userModel.findOne({ email: email });

        if (!user) throw new Error('Email chưa được đăng ký');

        if (user.password.toString() === password.toString()) return user;

        return null;

    } catch (error) {
        console.log('Login error: ', error.message);
        throw new Error('Đăng nhập thất bại');
    }
}

// Update
const update = async (email, password, name) => {
    try {

        let user = await userModel.findOne({ email: email });
        if (!user) throw new Error('Email không tồn tại');

        

        user.password.toString() === password.toString ? null : user.password = password;
        user.name.toString() === name.toString() ? null : user.name = name;

        const result = await user.save();
        return result;
    } catch (error) {
        console.log('Update error: ', error.message);
        throw new Error('Cập nhật thất bại');
    }
}

module.exports = { register, login, update };