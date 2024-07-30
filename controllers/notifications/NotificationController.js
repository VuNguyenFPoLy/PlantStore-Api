const NotificationModel = require('./NotificationModel');

// create notification

const createNotification = async (data) => {
    try {
        const notification = new NotificationModel(data);
        const result = await notification.save();
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Create notification error: ', error.message);
        return null;
    }
}

// get notifications by is user
const getNotification = async (idUser) => {
    try {
        const result = await NotificationModel.find({ idUser: idUser });
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Get notification error: ', error.message);
        return null;
    }
}

// get all notification
const getAllNotification = async () => {
    try {
        const result = await NotificationModel.find();
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Get all notification error: ', error.message);
        return null;
    }
}

// delete notification
const deleteNotification = async (id) => {
    try {
        const result = await NotificationModel.findOneAndDelete({ _id: id });
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Delete notification error: ', error.message);
        return null;
    }
}

// update notification
const updateNotification = async (id, data) => {
    try {
        const result = await NotificationModel.findOneAndUpdate({ _id: id }, data);
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Update notification error: ', error.message);
        return null;
    }
}

module.exports = {
    createNotification,
    getAllNotification,
    deleteNotification,
    updateNotification,
    getNotification
}