
const domain = 'http://192.168.0.62:5000'

export const postData = (url = ``, data = {}) => {
    return fetch(domain + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}

export const getUsers = (url, token) => {
    return fetch(domain + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + token
        }
    })
    .then(response => response.json());
}

export const checkResetToken = (url, token) => {
    return fetch(domain + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
    .then(response => response.json());
}