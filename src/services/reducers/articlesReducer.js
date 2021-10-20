import { articles_request, get_articles_success, get_articles_failed  } from "../types";

const initialState = {
    loading: false,
    articldata: [],
    error: ''
}

export default function foo(state = initialState, action){
    switch(action.type){
        case articles_request:
            return{
                ...state,
                loading: true
            }
        case get_articles_success:
            return {
                ...state,
                loading: false,
                articldata: action.payload
            }
        case get_articles_failed:
            return {
                ...state,
                loading: false,
                articldata: [],
                error: action.payload
            }
        default:
            return state
    }
}