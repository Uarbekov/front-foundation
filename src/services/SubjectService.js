import axios from 'axios';
import Cookies from 'universal-cookie'
import cookie from 'react';
import {useCookies} from 'react-cookie';
import CommonConst from "../common/CommonConst";

const SUBJECT_API_BASE_URL = CommonConst.getUrl('subject');

class SubjectService {
    getSubjects(){
        return axios.get(SUBJECT_API_BASE_URL + "/all",
            CommonConst.getConfig()
            );
    }

    createSubject(subject){
        return axios.post(SUBJECT_API_BASE_URL + "/create", subject,
            CommonConst.getConfig());
    }

    updateSubject(subject){
        return axios.post(SUBJECT_API_BASE_URL + "/update", subject,
            CommonConst.getConfig());
    }

    getSubjectById(subjectId){
        return axios.get(SUBJECT_API_BASE_URL + "/" + subjectId,
            CommonConst.getConfig());
    }

    deleteQuestionTypeById(subjectId){
        return axios.delete(SUBJECT_API_BASE_URL + "/delete/" + subjectId,
            CommonConst.getConfig());
    }
}

export default new SubjectService()