const SearchHistoryModel = require('./SearchHistoryModel');

// Get all search histories
const getAll = async () => {
    try {
        const result = await SearchHistoryModel.find();
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Get all search history error: ', error.message);
        throw new Error('Lấy dữ liệu thát bại');
    }
}

// Add search history
const addSearchHistory = async (data) => {
    console.log(data.name)
    try {
            const name = data.name;
        // check search history in db
        // if not exist => create new

        const checkSearchHistory = await SearchHistoryModel.findOne({ name: name });

        if (checkSearchHistory) {

            if (checkSearchHistory.available == false) {
                checkSearchHistory.available = true;
                const result = await checkSearchHistory.save();
                if (result) return result;
                return null;
            }else{
                return checkSearchHistory;
            }
        }

        // create new
        const searchHistory = new SearchHistoryModel({ name: name });
        const result = await searchHistory.save();
        if (result) return result;
        return null;

    } catch (error) {
        console.log('Add search history error: ', error.message);
        throw new Error('Thêm dữ liệu thất bại');
    }
}

// Delete search history (don't delete but set available = false)
const deleteSearchHistory = async (id) => {
    try {
        const searchHistory = await SearchHistoryModel.findById(id);

        if (searchHistory) {
            searchHistory.available = false;
            const result = await searchHistory.save();
            if (result) return result;
        }
        return null;
    } catch (error) {
        console.log('Delete search history error: ', error.message);
        throw new Error('Xóa dữ liệu thất bại');
    }
}

module.exports = { getAll, addSearchHistory, deleteSearchHistory };
