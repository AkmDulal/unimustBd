import React, { Component } from 'react';
import BannerBg from "../images/slider_image1.jpg";
import { Container, Row, Col } from 'react-bootstrap';
import { BiSearch, BiSend } from "react-icons/bi";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import config from "../config"

import API_URL from "../config.json"
import api from "../api"





// const url = api.baseurl;
class Banner extends Component {
    constructor(){
        super()
        this.state={
		    servicesLink: [],
		    displaylist: [],
            search: "",
            searcharray: {
                course:'',
                country:'',
            },
            courcesSearch: "",
            sliderLink: [],
            loading: true,

            myURL: 'http://unimustbd.com/'

        }
    }
    // http://unimustbd.com/admin/api/v1
    componentDidMount = () => {
        let url=API_URL.SERVER_URL;
        let hdr_url = API_URL.HEDAER_URL;
        console.log('HELLO', url)
        console.log('HELLO', `${this.state.myURL}/slider`)
        
        axios.get("http://unimustbd.com/admin/api/v1/slider",{ 
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }, 
        }).then(res => {
            this.setState({
                sliderLink: res.data,
                loading: false,
            });
        });

        axios.get('http://unimustbd.com/admin/api/v1/allcountries',{
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }).then(res => {
            console.log(res.data);
            this.setState({
                servicesLink: res.data,
                loading: false,
            });
        });

        axios.get('http://unimustbd.com/admin/api/v1/subdisciplinelist',{
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }).then(res => {
            this.setState({
                displaylist: res.data,
                loading: false,
            });
        })
      }

      onchange = e => {
        //   this.setState({searcharray:{country:e.target.value}});
        this.state.searcharray.country= e.target.value;
      };
      onchangeCources = e => {
        // this.setState({searcharray:{course:e.target.value}});
        this.state.searcharray.course= e.target.value;
      };


    render() {
        const { servicesLink, displaylist, search, courcesSearch, sliderLink  } = this.state;

        const baseurl = config.BpiUrl

        let alldata = []
        let allCourcesdata = []
        let sliderLinkdata = []
        // servicesLink
        if(servicesLink.data){
            alldata = servicesLink.data
        }else {
            alldata = []
        }
        // allCourcesdata
        if(displaylist.data){
            allCourcesdata = displaylist.data
        }else {
            allCourcesdata = []
        }
        // slider
        if(sliderLink.data){
            sliderLinkdata = sliderLink.data
        }else {
            sliderLinkdata = []
        }
        // servicesLink
        const countryFilters = alldata.filter(country => {
            return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
          });
        // allCourcesdata
        const courcesFilters = allCourcesdata.filter(item => {
            return item.slug.toLowerCase().indexOf(courcesSearch.toLowerCase()) !== -1;
          });



        
          if (this.state.loading) return <Loading />

          console.log('servicesLink', servicesLink)
        return (
            <div>
                <div className="banner_area">
                    <div>
                        <img src={baseurl+sliderLinkdata.photo} alt="images"></img>
                    </div>

                    <div className="banner_box">
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={10}>
                                    <div className="banner_text text-center">
                                        {/* <h5>Expert instruction</h5> */}
                                        {/* <h1><span className="font-weight-normal">It's time to amplify</span> your online Career</h1> */}
                                        {/* <h2><span className="font-weight-normal">WHERE DREAMS COME TRUE</span> </h2> */}
                                        <h2><span className="font-weight-normal">{sliderLinkdata.title}</span> </h2>
                                        <form className="from_area" onSubmit={this.searchdata}>
                                            <div className="from_input">
                                                <input type="text" list="data" value={this.state.course} onChange={this.onchangeCources} className="form-control" placeholder="What do you want to study?"></input>
                                                <datalist id="data">
                                                    {courcesFilters.map((list, i) =>
                                                        <option className="form-control" key={i} value={list.name} />
                                                    )}
                                                </datalist>
                                            </div>

                                            <div className="from_input">
                                                <input type="text" list="dataname"  value={this.state.country} onChange={this.onchange} className="form-control" placeholder="Where?(country or state)"></input>
                                                <datalist id="dataname">
                                                    {countryFilters.map((item, key) =>
                                                        <option className="form-control" key={key} value={item.name} />
                                                    )}
                                                </datalist>
                                            </div>
                                            <Link to={{ pathname: "/course-list", state: this.state.searcharray  }}>
                                                <button className="search_btn">
                                                        <div className="text">
                                                            <span className="Search_text_Search"> Search  </span> <BiSearch />
                                                        </div>
                                                </button> 
                                            </Link>
                                        </form>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="process_area d-none">
                        <Container>
                            <Row>
                                <Col lg={4} className="process_boxx">
                                    <div className="single_work_process style2">
                                        <div className="icon_holder">
                                            <div className="span_class thm-clr4"> 
                                                <BiSend />
                                            </div>
                                            <div className="count-box counted"><p>01</p></div>
                                        </div>
                                        <div className="text_holder">
                                            <h3>Get a Free Quote</h3>
                                            <p>We will customize a loan based on the amount of cash your company need term length</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} className="process_boxx">
                                    <div className="single_work_process style2">
                                        <div className="icon_holder">
                                            <div className="processing-icon">
                                            <div className="span_class  thm-clr4"> 
                                                    <BiSend />
                                                    </div>
                                            </div>
                                            <div className="count-box counted"><p>02</p></div>
                                        </div>
                                        <div className="text_holder">
                                            <h3>Get a Free Quote</h3>
                                            <p>We will customize a loan based on the amount of cash your company need term length</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} className="process_boxx">
                                    <div className="single_work_process style2">
                                        <div className="icon_holder">
                                            <div className="span_class thm-clr4"> 
                                                <BiSend />
                                            </div>
                                            <div className="count-box counted"><p>03</p></div>
                                        </div>
                                        <div className="text_holder">
                                            <h3>Get a Free Quote</h3>
                                            <p>We will customize a loan based on the amount of cash your company need term length</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;