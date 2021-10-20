import { country_request, get_country_success, get_country_failed  } from "../types";
import axios from "axios";
// import config from "../../config"
export const usersList = () => {
    
// const apiVar = config.apiUrl
    return async (dispatch) => {
        try{
            dispatch({
                type: country_request
            })
            // const res = await axios.get('/countrydetailslist',{
            const res = await axios.get('http://unimustbd.com/admin/api/v1/countrydetailslist',{
                headers: {
                'Key': 'QGluZiNpbmZvdGVjaCM=',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
            })
            dispatch({
                type: get_country_success,
                payload: res.data,
                
            })
        } catch (error){
            dispatch({
                type: get_country_failed,
                payload: error.message
            })
        }
    }
}

