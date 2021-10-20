import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import  { usersList }  from "../services/actions/countryAction";
import { connect } from "react-redux";
import OwlCarousel from 'react-owl-carousel';
import { Link } from "react-router-dom";
import axios from "axios";

import CountryImg from "../images/sw.webp"
var striptags = require('striptags');
class CountryDetails extends Component {
    constructor(props){
        super(props);
        this.state= {
            usersList: [],
            loading: '',
            users: [],
            error:[],
            servicesLink:[],
            responsive:{
                0: {
                    items: 2,
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
                    items: 6,
                },
            },
            

        }
    }
    componentDidMount() {
        const sid = this.props.match.params.slug
        axios.get('http://unimustbd.com/admin/api/v1/countrydetailsview/'+sid,{
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        })
            .then(res => {
            this.setState({
                servicesLink: res.data
            });
        })

        this.props.usersList();
      }
    render() {
        const { users  } = this.props
        const { servicesLink  } = this.state
        let alldata = []
        let singledata = []

  
        if(users.data){
            alldata = users.data
        }else {
            alldata = []
        }
  
        if(servicesLink.data){
            singledata = servicesLink.data
        }else {
            singledata = []
        }
        console.log("dfsdfsdfsdfsdfsdfsdf",alldata)
        return (
            <div>
                <div className="country_banner">
                    <img src={CountryImg} alt="banner"></img>
                    <h3>  Find Bachelor's Degrees in <strong> {singledata.slug} </strong> </h3>
                    {/* <img src={"http://103.205.180.178/unimustbd/admin/"+singledata.photo} alt="banner"></img> */}
                </div>
                <div className="country_details">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="country_details_text">
                                    <div dangerouslySetInnerHTML={{ __html: singledata.description }} />
                                    
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="container-fluid details_padding">
                    <div className="country_header">
                        <h4> Where to study abroad? </h4>
                        <p> What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry <br></br> Lorem Ipsum has been the industry's standard dummy text  </p>
                    </div>

                    {alldata.length >0? (
                        <OwlCarousel 
                            className="owl-theme country_carosule_area" 
                            loop 
                            margin={10} 
                            nav={false}
                            dots={true}
                            autoplay={true}
                            autoplayTimeout={2000}
                            responsive={this.state.responsive}

                            >
                            {alldata.map((user, i) => {
                                return (
                                    <div key={i} >
                                        {/* country-details */}
                                        <Link to={`country-detail/${user.slug}`}>
                                        {/* <Link to="/visa-consultancy"> */}
                                            <div className="item">
                                                <div className="country_area">
                                                    <img src={"http://103.205.180.178/unimustbd/admin/"+user.photo} alt="images"></img>
                                                    <div className="features-item">
                                                        <span className="feature-count">0{user.id}</span>
                                                        <i className="webexflaticon flaticon-plan"></i>
                                                        <h4 className="feature-title">{user.slug}</h4>
                                                        <p className="mrb-0">{striptags(user.description.substring(0,250),'')}</p>
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
  )(CountryDetails);
