import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CountryImg from "../images/sw.png"
import axios from "axios";
import Loading from "../components/Loading"
import config from "../config"



class BlockDetails extends Component {
    constructor(props){
        super(props);
        this.state= {
            usersList: [],
            loading: true,
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
        const apiVar = config.apiUrl
        const sid = this.props.match.params.slug
        axios.get('http://unimustbd.com/admin/api/v1/articleview/'+sid,{
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        })
        .then(res => {
            this.setState({
                servicesLink: res.data,
                loading: false
            });
        })
      }
    render() {
        const { servicesLink  } = this.state
        let alldata = []
        if(servicesLink.data){
            alldata = servicesLink.data
        }else {
            alldata = []
        }
        if (this.state.loading) return <Loading />
        return (
            <div>
                <div className="country_banner">
                    <img src={CountryImg} alt="banner"></img>
                    {/* <h3>  Find Bachelor's Degrees in <strong> {singledata.slug} </strong> </h3> */}
                    <h3> <span>  {alldata.title} </span> </h3>
                    {/* <img src={"http://103.205.180.178/unimustbd/admin/"+singledata.photo} alt="banner"></img> */}
                </div>
                <div className="country_details">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="country_details_text">
                                    <div dangerouslySetInnerHTML={{ __html: alldata.description }} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default BlockDetails;