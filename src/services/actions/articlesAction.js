import { articles_request, get_articles_success, get_articles_failed  } from "../types";
import axios from "axios";

// import config from "../../config"
// import api from "../../api"
// import Api from "../../config.json"
// const res = await axios.get(Api.SERVER_URL+"/articals", Api.header)

export const articlesList = () => {

    // const apiVar = config.apiUrl
    return async (dispatch) => {
        try{
            dispatch({
                type: articles_request
            })
            const res = await axios.get("http://unimustbd.com/admin/api/v1/articals",{
                headers: {
                'Key': 'QGluZiNpbmZvdGVjaCM=',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
            })
            dispatch({
                type: get_articles_success,
                payload: res.data
            })
        } catch (error){
            dispatch({
                type: get_articles_failed,
                payload: error.message
            })
        }
    }
}