import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';

import  { usersList }  from "../services/actions/countryAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import config from "../config"
import axios from 'axios';

var striptags = require('striptags');



class Country extends Component {
    constructor(props){
        super(props);
        this.state= {
            usersList: [],
            loading: '',
            users: [],
            error:[],
            recentLink:[],
            aboutapi:[],
            searcharray: {
                course:'',
                country:'',
            },
            responsive:{
                0: {
                    items: 1,
                },
                450: {
                    items: 2,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 4,
                },
                1366: {
                    items: 5,
                },
                1920: {
                    items: 6,
                },
            },
        }
    }
    componentDidMount() {
        axios.get('http://unimustbd.com/admin/api/v1/sectonslist',{
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }).then(res => {
            this.setState({
                aboutapi: res.data
            });
        });

        this.props.usersList();
      }


 

    render() {
        const baseurl = config.BpiUrl
        const { users  } = this.props
        const { aboutapi  } = this.state



        let alldata = []
        let slingledata = []
        let testid = []
  
        if(users.data){
            alldata = users.data
        }else {
            alldata = []
            
        }

        if(aboutapi.data){
            slingledata = aboutapi.data
        }else {
            slingledata = []  
        }

        if(slingledata.country){
            testid = slingledata.country
        }else {
            testid = []  
        }

        console.log("alldata alldata ", alldata)
        console.log("aboutapi slingledata ", testid.title)

        return (
            <div className="country_full_area"> 

                <div className="container-fluid">
                    <div className="country_header">
                        <h4> {testid.title} </h4>
                        <p> {testid.sort_desc}  </p>
                    </div>

                    {alldata.length >0? (
                        <OwlCarousel 
                            className="owl-theme country_carosule_area equal-height-coulums" 
                            autoplayHoverPause={true}
                            loop 
                            margin={10} 
                            nav={false}
                            dots={false}
                            autoplay={true}
                            autoplayTimeout={4000}
                        
                            responsive={this.state.responsive}
                            >
                            {alldata.map((user, i) => {
                                return (
                                    <div key={i} >
                                        {/* <Link to={{ pathname:"/course-list/"+user.slug }}> */}
                                        <Link className="equal-height-contant" to={`country-details/${user.slug}`}>
                                            <div className="item ">
                                                <div className="country_area">
                                                    <img src={"http://unimustbd.com/admin/"+user.photo} alt="images"></img>
                                                    {/* <img src={} alt="images"></img> */}
                                                    <div className="features-item">
                                                        {/* <span className="feature-count">0{user.id}</span> */}
                                                        <i className="webexflaticon flaticon-plan"></i>
                                                        <h4 className="feature-title">{user.country.name}</h4>
                                                        <p className="mrb-0"> {(striptags(user.description,'').replace(/\&nbsp;/g, "")).substring(0,50)}... </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </OwlCarousel>
                    ) :''} 
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    loading: state.countryReducer.loading,
    users: state.countryReducer.users,
    error: state.countryReducer.error
});

const mapDispacthToProps = dispatch => {
    return {
        usersList: () => dispatch(usersList())    
    };
  
  };

  export default connect(
    mapStateToProps,
    mapDispacthToProps
  )(Country);
