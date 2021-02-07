import axios from "axios";
import CommonConst from "../common/CommonConst";

const QUESTION_API_BASE_URL = CommonConst.getUrl('question');

class QuestionService {

    getBySubject(sub) {
        return axios.get(QUESTION_API_BASE_URL + "/subject/" + sub, CommonConst.getConfig());
    }

    getByType(type) {
        return axios.get(QUESTION_API_BASE_URL + "/type/" + type, CommonConst.getConfig());
    }

    getById(id) {
        return axios.get(QUESTION_API_BASE_URL + "/" + id, CommonConst.getConfig());
    }

    createQuestion(question) {
        return axios.post(QUESTION_API_BASE_URL + "/create", question, CommonConst.getConfig());
    }

    updateQuestion(question) {
        return axios.post(QUESTION_API_BASE_URL + "/update", question, CommonConst.getConfig());
    }
}

export default new QuestionService();