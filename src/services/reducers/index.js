import { combineReducers } from "redux";

import countryReducer from "./countryReducer";
import articlesReducer from "./articlesReducer";
import eventReducer from "./eventReducer";
export default combineReducers({
    countryReducer,
    articlesReducer,
    eventReducer
})