import axios from 'axios';

const apiUrl = 'https://127.0.0.1:8000/api/';

class Api {
    getTest() {
        return axios.get(apiUrl + 'test')
            .then(response => response.data);
    }

    checkAnswer(wordId, answerId) {
        return axios.post(apiUrl + 'test',
            {wordId: wordId, answerId: answerId}
        ).then(response => response.data);
    }

    getLists(language, translation) {
        let url = apiUrl + 'group';
        if (!!language || !!translation) {
            url += '?language=' + language + '&translation=' + translation;
        }

        return axios.get(url)
            .then(response => response.data);
    }

    getList(id) {
        if (!id || id < 1) {
            return null;
        }

        return axios.get(apiUrl + 'group/' + id)
            .then(response => response.data);
    }

    getLanguages() {
        return axios.get(apiUrl + 'language')
            .then(response => response.data);
    }

    uploadList(file, title, language, translation) {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('group', title);
        formData.append('original', language);
        formData.append('translation', translation);

        return axios.post(apiUrl + 'upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    }

    uploadLanguage(code, name) {
        return axios.post(apiUrl + 'language/create',
            {code: code, name: name}
        ).then(response => response.data);
    }
}

const api = new Api()

export default api
