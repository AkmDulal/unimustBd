import React, { Component } from 'react';
import CourcesDetails from "../images/detailsImg.jpg" 
import { VscArrowRight, VscPreview } from "react-icons/vsc";
import { BiHistory, BiDollarCircle, BiMapPin } from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config"

// BiHistory
class CoursesDetails extends Component {

    constructor(props){
        super(props);
        this.state= {
            coursesDetails:[],
            courcesdetailsdata:[]
        }
    }

    componentDidMount() {
        const sid = this.props.match.params.slug
        const apiVar = config.apiUrl
        axios.get('http://unimustbd.com/admin/api/v1/coursedtails/'+sid,{
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }).then(res => {
            var courcesdetailsdata = res.data.details
            this.setState({
                coursesDetails: res.data,
                courcesdetailsdata: res.data.details
            });
        })
      }


    render() {
        // const {eventDetails} = this.state;
        const baseurl = config.BpiUrl
        
        const { coursesDetails  } = this.state
        let singledata = []
        let singledetailsdata = []

        if(coursesDetails.data){
            singledata = coursesDetails.data
        }else {
            singledata = []
        }

        if(singledata.details){
            singledetailsdata = singledata.details
        }else {
            singledetailsdata = []
        }

        console.log('new 0000000',singledata);
        console.log('new 999999',singledetailsdata);
        // console.log('new000001',singledetailsdata.course_id);
        return (
            <div>
                <div className="cources__details_hedaer">
                    <img src={CourcesDetails} alt="cources-details"></img>
                    <Link className="kopal__design" to={`/application-pages/${singledata.slug}`}> Apply Now </Link>
                    <div className="container">
                        <div className="cources__details_hedaer_text">
                            <h3> <VscArrowRight className="cors___svg" /> {singledata.title} </h3>
                            <p> <Link className="black" to={`/application-pages/${singledata.slug}`}> Apply Now </Link>  </p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="dureasion__box">
                        <div className="dureasion__single_box">
                            <VscPreview />
                            <div className="dureasion__single_box_text">
                                <p> {singledata.application_deadline} </p>
                                <p> Application Deadline </p>
                            </div>
                        </div>
                        <div className="dureasion__single_box">
                            <BiHistory />
                            <div className="dureasion__single_box_text">
                                <p> {singledata.course_duration} {singledata.tution_fee_type} </p>
                                <p> Duration </p>
                            </div>
                        </div>
                        <div className="dureasion__single_box">
                            <BiDollarCircle />
                            <div className="dureasion__single_box_text">
                                <p> {singledata.tution_fee} {singledata.currency}/Years </p>
                                <p> Tuition Fee  </p>
                            </div>
                        </div>
                    </div>
                    <div className="cors___boxx">
                        <div className="row">
                            <div className="col-lg-3">
                            <div className="cors__img">
                            <img src={baseurl+singledata.thumbnail} alt=""></img>
                                {/* <img src="http://storage-prtl-co.imgix.net/endor/studies/48754/logos/1604315250_sumas-black-no-ref-svg-copy.png?w=222&h=96&fit=max&bg=fff&pad=8&auto=format,compress" alt="logo"></img> */}
                                <p> <a href={ singledata.orginal_url}>  Visit Programme Website </a>  </p>
                            </div>
                            </div>
                            <div className="col-lg-8">
                            <div className="cors___details">
                                <h4>  {singledata.title} </h4>
                                {/* <p> <BiMapPin /> Gland, Switzerland | Milano, Italy </p> */}
                                <p> {singledata.shortdes} </p>
                            </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
                <div className="cors__tabs">
                    <div className="container">
                    <Tabs>
                        <TabList>
                        {singledetailsdata.length >0? (
                            <div>
                                {singledetailsdata.map((user, i) => {
                                    return (
                                        <Tab Key={i}> {user.option.name} </Tab>
                                    );
                                })}
                            </div>
                            ) :
                            <div>
                                <h1> Data Not Found </h1>
                            </div>
                        } 
                        </TabList>

                        {singledetailsdata.length >0? (
                            <div>                                
                                {singledetailsdata.map((user, i) => {
                                    return (
                                        <TabPanel className="cors__tabs_contant">
                                            <div className="coors__txt">
                                                <div className="e__text" dangerouslySetInnerHTML={{ __html: user.details }} />
                                            </div>
                                        </TabPanel>
                                    );
                                })} 
                            </div>
                            ) :
                            <div>
                                <h1> Data Not Found </h1>
                            </div>
                        }

                        

                        {/* <TabPanel className="cors__tabs_contant">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="coors__txt">
                                        <h3> Overview </h3>
                                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla ligula mattis porta condimentum. Donec sit amet arcu dictum, commodo orci eu, pulvinar nisl. Proin pharetra sit amet ligula ut pharetra. Etiam tincidunt justo vitae felis maximus, ac finibus mauris dapibus. Vivamus consectetur laoreet ipsum, ac volutpat ligula facilisis id. Duis sapien augue, euismod ut sollicitudin in, sagittis a lorem. Suspendisse potenti. Nunc dapibus sodales sollicitudin. Aliquam erat volutpat.  </p>
                                    </div>
                                </div>
                            </div>
                        </TabPanel> */}
                    </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default CoursesDetails;