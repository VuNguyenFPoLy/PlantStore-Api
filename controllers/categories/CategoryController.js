const CategoryModel = require('./CategoryModel');

// Get all
const getAll = async () => {
    try {
        const result = await CategoryModel.find();
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Get all category error: ', error.message);
        throw new Error('Lấy dữ liệu thất bại');
    }
}

// Get by id
const getById = async (id) => {
    try {
        const result = await CategoryModel.findOne({ _id: id });
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Get by id category error: ', error.message);
        throw new Error('Lấy dữ liệu thất bị');
    }
}


// Add
const addCategory = async (data) => {
    try {

        const { name, role } = data;

        const category = new CategoryModel({
            name,
            role
        });

        const result = await category.save();
        if (result) return result;

        return null;
    } catch (error) {
        console.log('Add category error: ', error.message);
        throw new Error('Thêm thể loại thất bại');
    }

}

// delete
const deleteCategory = async (id) => {
    try {

        const category = await CategoryModel.findOne({ _id: id });

        if (!category) throw new Error('id không tìm thấy');

        const result = await CategoryModel.deleteOne({ _id: id });
        if (result) return result

        return null;
    } catch (error) {
        console.log('Delete category error: ', error.message);
        throw new Error('Xóa thể  loại thất bại');
    }
}

// update
const updateCategory = async (id, data) => {
    try {

        const { name, role } = data;

        const category = await CategoryModel.findOne({ _id: id });
        if (!category) throw new Error('id không tìm thấy');

        category.name = name || category.name;
        category.role = role || category.role;

        category.updateAt = Date.now();

        const result = category.save();
        if (result) return result;

        return null;

    } catch (error) {
        console.log('Update category error: ', error.message);
        throw new Error('Cập nhật thể loại thất bại');
    }
}



module.exports = { addCategory, deleteCategory, updateCategory, getAll, getById };