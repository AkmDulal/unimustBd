
import React, {useEffect} from 'react';
import  {usersList}  from "../services/actions/countryAction";
import { connect } from "react-redux";

const CountryData = ({usersList, loading, users, error}) => {
    useEffect(() => {
        usersList()
    }, [])
    
    return (
        <div>
            {
                loading ? <h3>Loading...</h3> : error ? <h3>  {error} </h3> : <div> 
                    {
                        users.map(user => {
                            return <div className="">
                                <h4> {user.title} {user.userId} </h4> 
                                <h6> {user.body} {user.id} </h6> 
                            </div> 
                            
                        })
                    }
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({ 
    loading: state.countryReducer.loading,
    users: state.countryReducer.users,
    error: state.countryReducer.error
})

export default connect(mapStateToProps, {usersList})(CountryData);
