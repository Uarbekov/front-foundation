

class CommonConst {
    getCommonMediaUrl() {
        return 'http://localhost:81/media/';
    }

    getUrl(spec) {
        return 'http://localhost:8080/' + spec;
        // return 'http://192.168.1.112:8080/' + spec;
    }

    getConfig () {
        return {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
                };
    }
}
export default new CommonConst();