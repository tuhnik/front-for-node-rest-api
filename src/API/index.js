import store from '../store.js'
const domain = 'http://localhost:5000'

let token = ""

document.store = store

store.subscribe( () => {
    const state = store.getState()
    console.log(state)
    if(state.token){
        token = state.token
    }
});

const login = (data) => {
    return fetch(domain + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}

const register = (data) => {
    return fetch(domain + "/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}

const forgotPassword = (data = {}) => {
    return fetch(domain + "/users/forgotpassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}

const getUsers = () => {
    return fetch(domain + '/users', {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + token
        }
    })
    .then(response => response.json());
}

const getUser = (id) => {
    return fetch(domain + '/users/' + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + token
        }
    })
    .then(response => response.json());
}

const checkResetToken = (email, token) => {
    return fetch(domain +"/users/checkresettoken/" + email + "/" + token, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
    .then(response => response.json());
}

const activateUser = (token) => {
    return fetch(domain + "/users/activate/"+ token, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
    .then(response => response.json());
}

const resetPassword = (data) => {
    return fetch(domain +"/users/resetpassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json());
}

const deleteUser = (id) => {
    return fetch(domain +"/users/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + token
        }
    })
    .then(response => response.json());
}

export const userService = {
    login,
    register,
    getUsers,
    getUser,
    checkResetToken,
    forgotPassword,
    activateUser,
    resetPassword,
    deleteUser
};