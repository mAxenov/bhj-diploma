/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData;
    let url = options.url;

    if (options.method === 'POST') {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
        console.log(formData);
    } else {
        for (let key in options.data) {
            if (url.indexOf('?') === -1) {
                url = url + '?';
            } else {
                url = url + '&';
            }
            url = url + key + '=' + options.data[key];
        }
    }

    xhr.open(options.method, url + '/user/login');
    xhr.responseType = 'json';
    if (options.method === 'POST') {
        xhr.send(formData);
    } else {
        xhr.send();
    }

    xhr.onload = function () {
        options.callback(null, xhr.response);
    }
    xhr.onerror = function () {
        options.callback(xhr.status);
    }
};

createRequest({
    url: 'https://example.com',
    data: {
        mail: 'ivan@biz.pro',
        password: 'odinodin'
    },
    method: 'POST',
    callback: (err, response) => {
        console.log('Ошибка, если есть', err);
        console.log('Данные, если нет ошибки', response);
    }
});
