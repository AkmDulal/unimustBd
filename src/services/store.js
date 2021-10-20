import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducers from "./reducers"


const initialState = {}
export const store = createStore(
    rootReducers,
    initialState,
    composeWithDevTools(applyMiddleware (thunk))
)