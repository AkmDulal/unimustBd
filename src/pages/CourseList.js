import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Loading from "../components/Loading"

import { Collapse, Checkbox } from 'antd';
import {  Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import CollagLogo from "../images/clg_logo.png"
import { VscHeart } from "react-icons/vsc";
import OwlCarousel from 'react-owl-carousel';
// import { FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import Fade from 'react-reveal/Fade';
// import { Badge } from 'antd';
// import {Pagination} from '@material-ui/core';
import axios from "axios";
import {  Radio } from 'antd';
import ReactPaginate from 'react-paginate';

import config from "../config"
import { compose } from 'redux';
import { BiSearch } from 'react-icons/bi';
import LogoIcon from "../images/logo_icon.png"
const { Panel } = Collapse;
var striptags = require('striptags');
// const { TabPane } = Tabs;



class CourseList extends Component {
    constructor(props){
        super(props);
        this.state= {
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
                991: {
                    items: 3,
                },
                1280: {
                    items: 4,
                },
            },
            mycourses: [],
            courcesrelateddata:[],
            loading: true,

            totaldata:0,
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 4,
            currentPage: 1,
            cslug:1,

            value: 1,
            tuitionfee:0,
            dutration:0,
            ct:0,
            country:'',
            viewalldata:0,

            searcharray: {
                course:''
            },
            courcesSearch: "",

        }
       
        this.searchdata();
        this.handlePageClick = this.handlePageClick.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputDurationChange = this.handleInputDurationChange.bind(this);
        this.handleInputFormateChange = this.handleInputFormateChange.bind(this);
    }


    searchdata () {
        let body={
            'country':this.state.country, 
            'perpage':this.state.perPage,
            'pagenumber':this.state.currentPage,
            'tution_fee':this.state.tuitionfee,
            'duration':this.state.duration,
            'course_type':this.state.ct,
            'cs': this.state.courcesSearch
        }
        if(this.state.cslug == 1){
            if(this.props.match.params.cslug !== undefined){
                this.state.country= this.props.match.params.cslug;
            }
        }
        console.log(this.state.cslug);
        if(this.state.viewalldata == 0){
        
            // if(this.props.match.params.cslug !== undefined){
            //     this.state.country= this.props.match.params.cslug;
            // }
            if(this.props.location.state === undefined){
                if(this.state.course !== undefined){
                    body.course = this.state.course
                }
                if(this.state.country !== undefined){
                    body.country = this.state.country
                }
            }else{
                if(this.props.location.state.course !== ''){
                body.course = this.props.location.state.course
                }
                if(this.props.location.state.country !== ''){
                    body.country = this.props.location.state.country
                }
            }
        }

      
        
        // alert(body.country);
        console.log('body',  body)
        const apiVar = config.apiUrl
        axios.post('http://unimustbd.com/admin/api/v1/courses', body, {
            perPage: this.state.perPage,
            currentPage: this.state.currentPage,
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }).then(res => {
            var data = res.data.data;
            var totaldata = res.data.totaldata;
            var courcesrelateddata = res.data.related
            this.setState({
                mycourses:res.data,
                totaldata: res.data.totaldata,
                courcesrelateddata: res.data.related,
                loading: false

            })
        });

    };
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage + 1,
            offset: offset
        }, () => {
            this.searchdata();
        });

    };
    handleMaxChange(event) {
        // const minValue = '' 
        // const { value } = event.target
      
        // if (minValue && value) {
        //   this.props.onValueChange("OKKKKKK")
        // }
      }

      handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        if(target.checked){
            // this.state.tuitionfee[value] = value;  

            
            this.setState({
                tuitionfee: value
            }, () => {
                this.searchdata();
            });

        }else{
            this.state.tuitionfee.splice(value, 1);
        }
    } 

    handleInputDurationChange(event) {
        const target = event.target;
        var value = target.value;
        if(target.checked){
            // this.state.tuitionfee[value] = value;  

            
            this.setState({
                duration: value
            }, () => {
                this.searchdata();
            });

        }else{
            this.state.dutration.splice(value, 1);
        }
    }

    handleInputFormateChange(event) {
        const target = event.target;
        var value = target.value;
        if(target.checked){
            // this.state.tuitionfee[value] = value;  
            
            this.setState({
                ct: value
            }, () => {
                window.scrollTo(0, 0);
                this.searchdata();
            });

        }else{
            this.state.ct.splice(value, 1);
        }
    }

    onchangeCources = e => {
        this.state.courcesSearch= e.target.value;
        this.searchdata();
      };

    onlocation = e => {
        this.state.country= e.target.value;
        this.searchdata();
      };

      viewAllData =()=>{
        this.state.viewalldata = 1;
        this.state.cslug = 0;
        this.state.country = '';
        this.searchdata();
      }


    render() {
        const  {mycourses, courcesrelateddata} = this.state;
        const baseurl = config.BpiUrl
        let alldata = [];

        // servicesLink
        if(mycourses.data){
            alldata = mycourses.data
        }else {
            alldata = []
        }


        var countrydata = [];
        alldata.map((user, i) => {
            if(countrydata.indexOf(user.country) === -1){
                countrydata.push(user.country);
            }
        })



console.log("mycourses",  mycourses)
// console.log("totaldata",  this.state.totaldata)


        if (this.state.loading) return <Loading />
        return (
            <div>
                <div className="cources_list_area">
                    <Container>
                       
                        <Row>
                            <Col className="padding0" lg={3}>
                                <Collapse defaultActiveKey={['1','2','3','4']} >
                                    <Panel header="Tution Fee" key="1">
                                        <Radio.Group defaultValue="a" size="large">
                                            <Radio name="tuitionfee" value="500-1000" onChange={this.handleInputChange}>500–1,000 <strong>EUR</strong> </Radio>
                                            <Radio value="1000-5000" onChange={this.handleInputChange}>1,000–5,000 <strong>EUR</strong> </Radio>
                                            <Radio value="5000-10000" onChange={this.handleInputChange}>5,000–10,000 <strong>EUR</strong> </Radio>
                                            <Radio value="10000-20000" onChange={this.handleInputChange}> 10,000-20,000 <strong>EUR</strong> </Radio>
                                        </Radio.Group>
                                    </Panel>

                                    <Panel header="Duration" key="2">
                                    <Radio.Group defaultValue="b" size="large">
                                        <Radio name="duration" onChange={this.handleInputDurationChange} value="0.5" > 6 <strong>month</strong> </Radio>
                                        <Radio onChange={this.handleInputDurationChange} value="1" > 1 <strong>years</strong> </Radio>
                                        <Radio value="2" onChange={this.handleInputDurationChange} >2 <strong>years</strong> </Radio>
                                        <Radio value="2.5" onChange={this.handleInputDurationChange} >2½ <strong>years</strong> </Radio>
                                        <Radio value="3" onChange={this.handleInputDurationChange}>3 <strong>years</strong> </Radio>
                                        <Radio value="3.5" onChange={this.handleInputDurationChange}>3½ <strong>years</strong></Radio>
                                        <Radio value="4"  onChange={this.handleInputDurationChange}>4 <strong>years</strong> </Radio>
                                    </Radio.Group>
                                    </Panel>
                                    <Panel header="Format" key="3">
                                        <Radio.Group defaultValue="b" size="large">
                                            <Radio name="ct" value="full" onChange={this.handleInputFormateChange}  > Full-time</Radio>
                                            <Radio value="part" onChange={this.handleInputFormateChange} > Part-time </Radio>
                                        </Radio.Group>
                                    </Panel>

                                    <Panel header="Location " key="4">
                                        <Radio.Group defaultValue="b" size="large">
                                        {countrydata.length >0? (
                                            <div>
                                                {countrydata.map((country) => {
                                                    return (
                                                    <Radio name="ct" onChange={this.onlocation} value={country} > {country} </Radio>
                                                    );
                                                })}
                                            </div>
                                            ) :
                                            ''
                                            } 
                                        </Radio.Group>
                                    </Panel>
                                    
                                </Collapse>
                            </Col>
                            <Col lg={9}>
                                <div className="cources_box_list">
                                <Row>
                                    <Col lg={12}>

                                         {/* <input name="cs" type="text" list="data" value={this.state.course} onChange={this.onchangeCources} className="form-control" placeholder="Search course name"></input> */}
                        
                                    </Col>

                                </Row>
                                <Tabs>
                                    <TabList>
                                        <p> Records Fuond {this.state.totaldata} </p>
                                        <div className="corse_search__input">
                                        <input name="cs " type="text" list="data" value={this.state.course} onChange={this.onchangeCources} className="form-control " placeholder="Search course name"></input>

                                        </div>
                                    </TabList>
                                    <TabPanel>
                                        <Fade top >
                                        {alldata.length >0? (
                                            <div>
                                                {alldata.map((user, i) => {
                                                    return (
                                                        <div key={i} >
                                                            <div className="cources_box_list_details">
                                                                <Row>
                                                                    <Col lg={2}>
                                                                        <a target="_blank" href={user.orginal_url}>
                                                                            <img src={baseurl+user.thumbnail} alt="collages logo"></img>
                                                                        </a>
                                                                    </Col>
                                                                    {/* thumbnail */}
                                                                    <Col lg={7}>
                                                                        <div className="collage_details">
                                                                             
                                                                            <h3>  <Link className="fontStyle" to={`/courses-details/${user.slug}`}> {user.title}  </Link></h3>
                                                                            <h5 className="fontWidth">{user.country}  </h5>
                                                                            <h5> Online  </h5>
                                                                            <p>  {user.shortdes} </p>
                                                                            <p> <span className="pSpanStyle"> {striptags(user.subdiscipline_name.substring(0,30),'')} </span> <span className="pSpanStyle"> {user.course_type}-time </span> </p>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg={3}>
                                                                        <div className="collage_details_right">
                                                                            <VscHeart className="hoverRed" />
                                                                            
                                                                            <p className="euro_price">  {user.tution_fee} {user.currency} / {user.course_duration} {user.tution_fee_type}  </p>
                                                                            <p> {user.country}    </p>
                                                                            <Link className="appleyBtn pSpanStyle" to={`/application-pages/${user.slug}`}>Apply Now </Link>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) :
                                        <div className="product__list_not_found">
                                            <img className="logo___Icon___" src={LogoIcon} alt="logo icon"></img>
                                            <p className="not_found_text"> Nothing to show here… yet. </p>
                                            <p className="not_found_btn" onClick={this.viewAllData}> View all </p> 
                                            
                                        </div>
                                        } 
                                        </Fade>
                                    </TabPanel>
                                </Tabs>
                                {/* {} */}


                                { (this.state.totaldata > 4)  ? (
                                    <div className="cources_box_list_details">
                                    <Row>
                                        <Col lg={12}>
                                            <div className="new__pg">
                                                <ReactPaginate
                                                    previousLabel={"prev"}
                                                    nextLabel={"next"}
                                                    breakLabel={"..."}
                                                    breakClassName={"break-me"}
                                                    pageCount={this.state.totaldata/this.state.perPage}
                                                    onPageChange={this.handlePageClick}
                                                    containerClassName={"pagination"}
                                                    subContainerClassName={"pages pagination"}
                                                    activeClassName={"active"}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                ) : (
                                   ''
                                )}

                               

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="corces__list">
                    <Container>
                        <Row>
                            <Col lg={12}>
                            <div className="country_header">
                                <h6> More Courses </h6>
                            
                            </div>

                            </Col>



                            {courcesrelateddata.length >0? (
                                <OwlCarousel 
                                    className="owl-theme country_carosule_area" 
                                    loop 
                                    margin={10} 
                                    nav={false}
                                    dots={true}
                                    autoplay={true}
                                    autoplayTimeout={10000}
                                    responsive={this.state.responsive}
                                    >
                                    {courcesrelateddata.map((user, i) => {
                                        return (
                                            <div key={i} >
                                                {/* <Link to={`country-details/${user.slug}`}> */}
                                                {/* <Link to={`courses-details/${user.slug}`}> */}
                                                    <div className="item">
                                                        <div className="country_area">
                                                            <img src={baseurl+user.thumbnail} alt="images"></img>
                                                            <div className="features-item">
                                                                {/* <span className="feature-count">0{user.id}</span> */}
                                                                <i className="webexflaticon flaticon-plan"></i>
                                                                {/* <h4 className="feature-title">{user.title}</h4> */}
                                                                <p className="feature-title" className="mrb-0">{striptags(user.title.substring(0,30),'')}</p>
                                                                <p className="feature-title" className="mrb-0">{user.country}</p>
                                                                <p className="euro_price">  ${user.tution_fee} / {user.course_duration} {user.tution_fee_type}  </p>
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






                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default CourseList;