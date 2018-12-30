// import {combineReducers} from "redux"

const initialState = {authed: false, email: null, token: null}

const rootReducer = (state = initialState, action) => {
    if(action.type === "LOGIN") {
        let newstate = {...state}
            newstate.authed = true
            newstate.token = action.payload.token
            newstate.email = action.payload.email
        return newstate
    }

    if(action.type === "LOGOUT") {       
        return {...initialState}
    }

    return state
}

export default rootReducer