import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import FeatureImages from "../images/feature.jpg";
import Icon from "../images/feature_icon.png";

import  { eventList }  from "../services/actions/eventAction";
import { connect } from "react-redux";

import OwlCarousel from 'react-owl-carousel';
import { Link } from "react-router-dom";
import config from "../config"

var striptags = require('striptags');
class Event extends Component {
    constructor(props){
        super(props);
        this.state= {
            mydata: [],
            responsive:{
                0: {
                    items: 1,
                },
                450: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
                1366: {
                    items: 1,
                },
            }
        }
    }
    componentDidMount() {
        this.props.eventList();
    }
    render() {
        const { mydata  } = this.props
        const baseurl = config.BpiUrl

        let alldata = []
        if(mydata.data){
            alldata = mydata.data
        }else {
            alldata = []
            
        }

        return (
            <div>
                <div className="event_area">
                {alldata.length >0? ( <OwlCarousel 
                    className="owl-theme country_carosule_area"
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
                        return (  <Container key={i}>
                        <div className="item">
                            <Row>
                                <Col lg={6}>
                                <div className="event_text">
                                    <h5>Our Event</h5>
                                    <h3>{user.title}</h3>
                                    <p>{striptags(user.details.substring(0,250),'')}</p>
                                    <div className="btn-box">
                                        <Link to={`/event-details/${user.slug}`}>
                                            <button className="theme-btn btn-style-two"><span className="txt">View Details</span></button>
                                        </Link>
                                    </div>
                                </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="inner-column">
                                        <div className="color-layer">
                                        <div className="image">
                                            {/* <img src={FeatureImages} alt=""></img> */}
                                            <img src={baseurl+user.thumbnail} alt=""></img>
                                            {/* <div className="overlay-box">
                                                <h2>How a degree on  <br></br> FutureLearn  <br></br>works</h2>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod but laboris incididunt ut labore et dolore magna </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod </p>
                                            </div> */}
                                        </div>
                                        </div>
                                        <div className="feature-icon">
                                            {/* <img src={Icon} alt=""></img> */}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    );
                })}
                </OwlCarousel>
                ) :<div> <h1> Data Not Found</h1></div>} 
                </div>
            </div>
        );
    }
}

// export default Event;

const mapStateToProps = (state) => ({ 
    loading: state.eventReducer.loading,
    mydata: state.eventReducer.mydata,
    
    error: state.eventReducer.error
});

const mapDispacthToProps = dispatch => {
    return {
        eventList: () => dispatch(eventList())    
    };
};

export default connect(
    mapStateToProps,
    mapDispacthToProps
)(Event);