const QuestionModel = require("./QuestionModel");

// get question
const getQuestion = async () => {
    try {
        const result = await QuestionModel.find();
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Get question error: ', error.message);
        return null;
    }
}

// add question
const addQuestion = async (data) => {
    try {
        const { question, answer } = data;
        const questionObj = new QuestionModel({ question, answer });
        const result = await questionObj.save();
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Add question error: ', error.message);
        return null;
    }
}

// update question
const updateQuestion = async (id, data) => {
    try {
        const { question, answer } = data;
        const result = await QuestionModel.findOneAndUpdate({ _id: id }, { question, answer });
        if (result) return result
        return null;
    } catch (error) {
        console.log('Update question error: ', error.message);
        return null;
    }
}

// delete question
const deteleQuestion = async (id) => {
    try {
        const result = await QuestionModel.findOneAndDelete({ _id: id });
        if (result) return result;
        return null;
    } catch (error) {
        console.log('Delete question error: ', error.message);
        return null;
    }
}

module.exports = { addQuestion, updateQuestion, deteleQuestion, getQuestion }