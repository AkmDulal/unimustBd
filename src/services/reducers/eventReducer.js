import { events_request, get_events_success, get_events_failed  } from "../types";
const initialState = {
    loading: false,
    mydata: [],
    error: ''
}

export default function foo(state = initialState, action){
    switch(action.type){
        case events_request:
            return{
                ...state,
                loading: true
            }
        case get_events_success:
            return {
                ...state,
                loading: false,
                mydata: action.payload
            }
        case get_events_failed:
            return {
                ...state,
                loading: false,
                mydata: [],
                error: action.payload
            }
        default:
            return state
    }
}
// mustafiz topu lul