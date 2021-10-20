import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import  { usersList }  from "../services/actions/countryAction";
import { connect } from "react-redux";
import OwlCarousel from 'react-owl-carousel';
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import config from "../config"

// import CountryImg from "../images/sw.webp"
var striptags = require('striptags');
class CountryDetails extends Component {
    constructor(props){
        super(props);
        this.state= {
            usersList: [],
            loading: true,
            users: [],
            error:[],
            servicesLink:[],

            users: [],
            error:[],
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
            },
            

        }
    }
    componentDidMount() {
        const sid = this.props.match.params.slug
        const apiVar = config.apiUrl
        axios.get('http://unimustbd.com/admin/api/v1/countrydetailsview/'+sid,{
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }).then(res => {
            this.setState({
                servicesLink: res.data,
                loading: false
            });
        })

        this.props.usersList();
      }
    render() {
        const { users  } = this.props
        const baseurl = config.BpiUrl
        const { user  } = this.props

        console.log("servicesLink settings ", this.state.servicesLink)

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

        if (this.state.loading) return <Loading />
        return (
            <div>
                <div className="country_banner">
                    {/* <img src={CountryImg} alt="banner"></img> */}
                    
                    <h3>  <span> Find Bachelor's Degrees in <Link to={{ pathname:"/course-list/"+singledata.slug }}>  <strong> {singledata.slug} </strong>  </Link> </span> </h3>
                    <img src={"http://unimustbd.com/admin/"+singledata.bannerimage} alt="banner"></img>
                </div>
                <div className="country_details html__class">
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

                <div className="container-fluid details_padding padding_bootom">
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
                            autoplayTimeout={4000}
                            responsive={this.state.responsive}

                            >
                            {alldata.map((user, i) => {
                                return (
                                    <div key={i} >
                                        {/* country-details */}
                                        {/* <Link to={`/country-details/${user.slug}`}> */}
                                            <div className="item">
                                                <div className="country_area">
                                                    <img src={baseurl+user.photo} alt="images"></img>
                                                    <div className="features-item">
                                                        <span className="feature-count">0{user.id}</span>
                                                        <i className="webexflaticon flaticon-plan"></i>
                                                        <h4 className="feature-title">{user.slug}</h4>
                                                        <p className="mrb-0">{striptags(user.description.substring(0,100),'')}</p>
                                                        <Link className="appleyBtn pSpanStyle pSpanStyleSize feature-title" to={`/application-pages/${user.slug}`}>Apply Now </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        {/* </Link> */}
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
