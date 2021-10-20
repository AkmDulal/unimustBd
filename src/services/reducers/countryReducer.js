import { country_request, get_country_success, get_country_failed  } from "../types";

const initialState = {
    loading: false,
    users: [],
    error: ''
}

export default function foo(state = initialState, action){
    switch(action.type){
        case country_request:
            return{
                ...state,
                loading: true
            }
        case get_country_success:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case get_country_failed:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state
    }
}