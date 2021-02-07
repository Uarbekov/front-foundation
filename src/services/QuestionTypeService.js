import axios from 'axios';
import CommonConst from "../common/CommonConst";

const QUESTION_TYPE_API_BASE_URL = CommonConst.getUrl('question_type');

class QuestionTypeService {
    getQuestionTypeBySub(subject){
        return axios.get(QUESTION_TYPE_API_BASE_URL + "/get/" + subject, CommonConst.getConfig());
        // return axios.get(QUESTION_TYPE_API_BASE_URL + "/get/" + subject);
    }

    createQuestionType(questionType){
        // return axios.post(QUESTION_TYPE_API_BASE_URL + "/create", questionType, CommonConst.getConfig());
        return axios.post(QUESTION_TYPE_API_BASE_URL + "/create", questionType, {
            headers: {'Content-Type' : 'application/json'},
            withCredentials: true
        });
    }

    updateQuestionType(questionType){
        return axios.post(QUESTION_TYPE_API_BASE_URL + "/update", questionType, CommonConst.getConfig());
    }

    getQuestionTypeById(questionTypeId){
        return axios.get(QUESTION_TYPE_API_BASE_URL + "/" + questionTypeId, CommonConst.getConfig());
    }

    deleteQuestionTypeById(questionTypeId){
        return axios.delete(QUESTION_TYPE_API_BASE_URL + "/delete/" + questionTypeId, CommonConst.getConfig());
    }
}

export default new QuestionTypeService();