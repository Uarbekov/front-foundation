import axios from 'axios';

const SUBJECT_API_BASE_URL = 'http://localhost:8080/media';

class MediaService {
    downloadMedia(media) {
        var bodyFormData = new FormData();
        bodyFormData.append('file', media);

        return axios.post(SUBJECT_API_BASE_URL + "/download", bodyFormData);
    }
}

export default new MediaService()