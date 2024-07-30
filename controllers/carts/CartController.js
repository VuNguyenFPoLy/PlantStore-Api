const CartModel = require('./CartModel');
const UserModel = require('../users/UserModel');
const ProductModel = require('../products/ProductModel');

const createCart = async (idUser, cartData) => {

    try {
        const user = await UserModel.findById(idUser).populate('carts');

        const { idProduct, quantity } = cartData;
        let existingCart = null;
        const promises = user.carts.map(async (cartId) => {
            const findCart = await CartModel.findById(cartId.toString());

            if (findCart?.idProduct?.toString() === idProduct.toString()) existingCart = findCart;
        });

        await Promise.all(promises);

        if (existingCart) {
            console.log('existingCart', existingCart)

            existingCart.quantity += quantity;
            existingCart.updatedAt = Date.now();

            await existingCart.save();
            return existingCart;
        } else {
            const cart = new CartModel({ ...cartData, idUser: idUser });

            const newCart = await cart.save();
            user.carts.push(newCart._id);
            await user.save();
            return newCart;
        }

    } catch (error) {
        console.log('Create cart error: ', error.message);
        return null;
    }
};

const getCart = async (id) => {
    try {
        const carts = await CartModel.find({ idUser: id })
        if (carts) return carts

        return null;
    } catch (error) {
        console.log('Get cart error: ', error.message);
        return null;
    }
};

const updateCart = async (id, data) => {
    try {
        const cart = await CartModel.findById(id).populate('user');
        if (!cart) return null;
        Object.assign(cart, data);
        const updatedCart = await cart.save();
        await UserModel.findByIdAndUpdate(
            cart.user._id,
            { $set: { 'carts.$[elem]': updatedCart._id } },
            { arrayFilters: [{ 'elem._id': id }], new: true }
        );
        return updatedCart;
    } catch (error) {
        console.log('Update cart error: ', error.message);
        return null;
    }
};

// delete all
const deleteAllCarts = async (idUser) => { 
    try {
        const result = await CartModel.deleteMany({ idUser: idUser });
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Delete all cart error: ', error.message);
        return null;
    }
}

// delete one
const deleteCart = async (userID, cartID) => {
    try {
        const carts = await CartModel.findById(cartID);
        const user = await UserModel.findById(userID)

        if (!user) throw new Error('Không tìm thấy user');

        const indexCartUser = user.carts.findIndex(item => item.toString() === cartID.toString());

        if (indexCartUser == -1) throw new Error('Không tìm thấy sản phẩm trong giỏ hàng');

        const deleteCart = await CartModel.deleteOne({ _id: cartID });
        if (deleteCart) {
            user.carts.splice(indexCartUser, 1)
            const result = await user.save();
            if (result) return result;
            return null
        } else {
            throw new Error('Xóa sản giỏ hàng thất bại');
        }

    } catch (error) {
        console.log('Delete cart error: ', error.message);
        return null;
    }
};

module.exports = {
    createCart,
    getCart,
    updateCart,
    deleteCart,
    deleteAllCarts
}