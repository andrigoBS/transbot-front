const get = (path) => {
    return _genericFetch('GET', path, null);
};

const post = (path, data) => {
    return _genericFetch('POST', path, data);
};

const put = (path, data) => {
    return _genericFetch('PUT', path, data);
};

const _isSuccess = (status) => status >= 200 && status <= 299;

const _genericFetch = (method, path, data, auth, accept = 'application/json') => {
    const init = {
        headers: {
            'Accept': accept,
            'Content-Type': 'application/json'
        },
        method: method,
        timeout: 240000
    };
    if(auth) { init.headers['authorization'] = auth; }
    if(data) { init['body'] = JSON.stringify(data); }
    return fetch(import.meta.env.REACT_APP_SERVER_URL+'/'+path, init).then(response => response.json());
};

export default { get, post, put };
