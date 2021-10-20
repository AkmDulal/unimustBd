import React, { Component,  } from 'react';
import { Container, Col, Row } from 'react-bootstrap'
// import CountryImg from "../images/sw.png"

import axios from "axios";
import config from "../config"


class StudentConsultancy extends Component {
    constructor(){
        super()
        this.state={
		    aboutapi: [],
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
      }
    render() {


        const {aboutapi} = this.state
        const baseurl = config.BpiUrl


        let slingledata = []
        let studentconsultancy_details = []

        if(aboutapi.data){
            slingledata = aboutapi.data
        }else {
            slingledata = []  
        }

        if(slingledata.studentconsultancy){
            studentconsultancy_details = slingledata.studentconsultancy
        }else {
            studentconsultancy_details = []  
        }
        console.log("aboutapi slingledata ", studentconsultancy_details)


        return (
            <div>
               <div className="country_banner">
                    <img src={baseurl+studentconsultancy_details.thumbnail} alt="banner"></img>
                    {/* <h3>  Find Bachelor's Degrees in <strong> {singledata.slug} </strong> </h3> */}
                    <h3>  <span> {studentconsultancy_details.title} </span> </h3>
                    {/* <h3>  {aboutapi.sort_desc} </h3> */}
                    {/* <img src={"http://103.205.180.178/unimustbd/admin/"+singledata.photo} alt="banner"></img> */}
                </div>
                <div className="country_details mg__bootom">
                    <Container>
                        <Row>
                            <Col lg={12}>
                            <div dangerouslySetInnerHTML={{ __html: studentconsultancy_details.sort_desc }} />
                                {/* <div className="country_details_text">
                                        <h3> {studentconsultancy_details.title} </h3> <br></br>
                                </div> */}
                            </Col>
                        </Row>
                    </Container>
                </div>

            </div>
        );
    }
}

export default StudentConsultancy;