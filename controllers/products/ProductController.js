const ProductModel = require('./ProductModel');
const CategoryModel = require('../categories/CategoryModel');
const { ObjectId } = require('mongodb');

// Get All Products
const getAllProduct = async () => {
    try {
        const result = await ProductModel.find();
        if (result) return result;

        return null;
    } catch (error) {
        console.log('Get all product error: ', error.message);
        throw new Error('Lấy dữ liệu thất bại');
    }
}

// Get Products by number
const getProductsByNumber = async (number) => {
    try {
        const result = await ProductModel.find().limit(number);

        if (result) return result;

        return null;
    } catch (error) {
        console.log('Get all product error: ', error.message);
        throw new Error('Lỗi dữ liệu thất bị');
    }
}

// Get by id
const getProductById = async (id) => {
    try {
      const result = await ProductModel.findById(id);
      if (result) return result;
      throw new Error('id không tìm thấy');
    } catch (error) {
      console.log('Get by id product error: ', error.message);
      throw new Error('Lấy dữ liệu thất bại');
    }
  }


// Add Product
const addProduct = async (data) => {
    try {
        const { name, idCategory, type, price, size, brand, quantity, description, image, role } = data;


        // kiểm tra định dạng tên
        if (name.length < 3) throw new Error('Tên quá ngắn');
        if (price < 0) throw new Error('Giá tiền phải là số dương');

        // kiểm tra danh mục
        const categoryDB = await CategoryModel.findById({ _id: idCategory });
        if (!categoryDB) throw new Error('Danh mục không tìm thấy');

        const product = new ProductModel({
            name,
            idCategory,
            type,
            price,
            size,
            brand,
            quantity,
            description,
            image,
            role
        });
        const result = await product.save();

        if (result) return result;
        return null;
    } catch (error) {
        console.log('Add product error: ', error.message);
        throw new Error('Thêm sản phẩm thất bại');
    }
}

// Update Product
const updateProduct = async (id, data) => {
    try {

        const product = await ProductModel.findById({ _id: id });

        if (!product) throw new Error('id không tìm thấy');

        const { name, idCategory, type, price, size, brand, quantity, description, image, role } = data;

        // kiểm tra định dạng tên
        if (name.length < 3) throw new Error('Tên quá ngắn');
        if (price < 0) throw new Error('Giá tiền phải là số dương');

        // kiểm tra danh mục
        const categoryDB = await CategoryModel.findById({ _id: idCategory });
        if (!categoryDB) throw new Error('Danh mục không tìm thấy');

        product.name = name || product.name;
        product.idCategory = idCategory || product.idCategory;
        product.type = type || product.type;
        product.price = price || product.price;
        product.size = size || product.size;
        product.brand = brand || product.brand;
        product.quantity = quantity || product.quantity;
        product.description = description || product.description;
        product.image = image || product.image;
        product.role = role || product.role;
        product.updatedAt = Date.now();

        const result = await product.save();
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Update product error: ', error.message);
        throw new Error('Cập nhật sản phẩm thất bại');
    }
}

// Delete Product
const deleteProduct = async (id) => {
    try {

        const product = await ProductModel.findById({ _id: id });

        if (!product) throw new Error('id không tìm thấy');

        const result = await ProductModel.deleteOne({ _id: id });
        if (result) return result
        return null;

    } catch (error) {
        console.log('Update product error: ', error.message);
        throw new Error('Xóa sản phẩm thất bại');
    }
}

module.exports = {
    addProduct, updateProduct, deleteProduct,
    getAllProduct, getProductById, getProductsByNumber
};