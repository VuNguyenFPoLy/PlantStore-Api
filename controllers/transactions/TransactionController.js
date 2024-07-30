const TransactionModel = require('./TransactionModel');

// create transaction
const createTransaction = async (data) => {
    try {
        const transaction = new TransactionModel(data);
        const result = await transaction.save();
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Create transaction error: ', error.message);
        throw new Error('Tạo lịch sử giao dịch thất bại')
    }
}

// get by id user
const getTransaction = async (idUser) => {
    try {
        const result = await TransactionModel.findOne({ idUser: idUser });
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Get transaction error: ', error.message);
        throw new Error('Lấy dữ liệu thất bại')
    }
}

// get all
const getAllTransaction = async () => {
    try {
        const result = await TransactionModel.find();
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Get all transaction error: ', error.message);
        throw new Error('Lấy dữ liệu thất bài')
    }
}

module.exports = { createTransaction, getTransaction, getAllTransaction }