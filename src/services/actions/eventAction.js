import { events_request, get_events_success, get_events_failed  } from "../types";
import axios from "axios";

// import config from "../../config"

export const eventList = () => {
    // const apiVar = config.apiUrl
    return async (dispatch) => {
        try{
            dispatch({
                type: events_request
            })
            // const res = await axios.get('/events',{
            const res = await axios.get('http://unimustbd.com/admin/api/v1/events',{
                headers: {
                'Key': 'QGluZiNpbmZvdGVjaCM=',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
            });
            dispatch({
                type: get_events_success,
                payload: res.data,
                
            })
        } catch (error){
            dispatch({
                type: get_events_failed,
                payload: error.message
            })
        }
    }
}



export const eventListDetails = () => {
    // const apiVar = config.apiUrl
    return async (dispatch) => {
        try{
            dispatch({
                type: events_request
            })
            const res = await axios.get('http://unimustbd.com/admin/api/v1/events',{
                headers: {
                'Key': 'QGluZiNpbmZvdGVjaCM=',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
            });
            dispatch({
                type: get_events_success,
                payload: res.data,
                
            })
        } catch (error){
            dispatch({
                type: get_events_failed,
                payload: error.message
            })
        }
    }
}
