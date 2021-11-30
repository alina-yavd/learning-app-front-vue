import axios from 'axios';

const apiUrl = 'https://127.0.0.1:8000/api/';

const api = {
    getTest(listId) {
        let url = new URL(apiUrl + 'test');

        if (listId) {
            url.searchParams.append('groupId', listId);
        }

        return axios.get(url.toString());
    },

    checkAnswer(wordId, answerId) {
        return axios.post(apiUrl + 'test',
            {wordId: wordId, answerId: answerId});
    },

    getLists(language, translation) {
        let url = new URL(apiUrl + 'group');

        if (language) {
            url.searchParams.append('language', language);
        }
        if (translation) {
            url.searchParams.append('translation', translation);
        }

        return axios.get(url.toString());
    },

    getList(id) {
        if (!id || id < 1) {
            return null;
        }

        return axios.get(apiUrl + 'group/' + id);
    },

    getLanguages() {
        return axios.get(apiUrl + 'language');
    },

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
        });
    },

    uploadLanguage(code, name) {
        return axios.post(apiUrl + 'language/create',
            {code: code, name: name}
        );
    },
}

export default api
