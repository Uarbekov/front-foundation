import CommonConst from "../common/CommonConst";
import axios from "axios";

const LOGIN_API_BASE_URL = CommonConst.getUrl('public');

class LoginService {

    login(login) {
        return axios.post(LOGIN_API_BASE_URL + "/admin/login", login,
            CommonConst.getConfig());
    }

}

export default new LoginService();
