import React, { Component } from 'react';
import { Container,  Row, Col } from 'react-bootstrap';
import FooterBg from "../../images/footer-bg.png";
import Flogo  from "../../images/footer_logo.png";
import { FaPhoneAlt, FaRegEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaRegClock } from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import FooterNews from "../../images/recent-post_01.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import config from "../../config"


class Footer extends Component {

    constructor(props){
        super(props);
        this.state= {
            countrylist:[],
            articalslist:[],
            settings: []
        }
    }
    // http://unimustbd.com/admin/api/v1
    componentDidMount() {
        // const apiVar = config.apiUrl
        axios.get('http://unimustbd.com/admin/api/v1/countrydetailslist',{
        // axios.get(apiVar+'/countrydetailslist',{
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }).then(res => {
            this.setState({
                countrylist: res.data
            });
        });

        axios.get('http://unimustbd.com/admin/api/v1/articals',{
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }).then(res => {
            this.setState({
                articalslist: res.data
            });
        });

        axios.get('http://unimustbd.com/admin/api/v1/settings',{
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }).then(res => {
            this.setState({
                settings: res.data
            });
        })
      }



    render() {
        const { countrylist, articalslist, settings  } = this.state
        const baseurl = config.BpiUrl
        let alldata = []
        let articalslistdata = []
        let settings_data = []
        // Country
        if(countrylist.data){
            alldata = countrylist.data
        }else {
            alldata = []
        }
        // articalslist
        if(articalslist.data){
            articalslistdata = articalslist.data
        }else {
            articalslistdata = []
        }
        // Footer
        if(settings.data){
            settings_data = settings.data
        }else {
            settings_data = []
        }

        console.log("settings", settings_data)
        return (
            <div>
                <div className="footer_area ">
                    <img className="footer__bg" src={FooterBg} alt="footer bg"></img>
                    <div className="footer_box">
                        <Container>
                            <Row>
                                <Col lg={3}>
                                    <div className="footer_s_one">
                                        <Link to="/"> <img src={Flogo} alt="logo"></img> </Link>
                                        {/* <Link to="/"> <img src={baseurl+settings_data.logo} alt="logo"></img> </Link> */}
                                        <p>  We understand applying overseas can be quite stressful and staggering. A lot   ..... <Link to="/about-us"> Read More </Link> </p>
                                    </div>
                                </Col>
                                <Col lg={3} sm={6}>
                                    <div className="footer_s_one">
                                        <div className="h3_footer">
                                            <h3> Useful Links  </h3>
                                        </div>
                                        <div className="footer_news_box footer__box_two">
                                            <Link className="footer_link" to="/student-consultancy"> <BiChevronRight className="f_svg" />  Student Consultancy  </Link>
                                            <Link className="footer_link" to="/visa-consultancy"> <BiChevronRight className="f_svg" />  Migration Consultancy  </Link>
                                            <Link className="footer_link" to="/medical-tourism"> <BiChevronRight className="f_svg" /> Medical Tourism Service  </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={3} sm={6}>
                                    <div className="footer_s_one">
                                        <div className="h3_footer">
                                            <h3> Blogs  </h3>
                                        </div>
                                        {articalslistdata.length >0? (
                                                <div>
                                                    {articalslistdata.slice(0, 2).map((user, i) => {
                                                        return (
                                                            <div key={i} >
                                                                <Link to={`/block-details/${user.slug}`}>
                                                                <div className="footer_news_box">
                                                                    <img src={baseurl+user.photo} alt="footer images"></img>
                                                                    <div className="footer_news_text">
                                                                        <h4> {user.title} </h4>
                                                                        <span> <FaRegClock /> {Moment(user.created_at).format('DD MMM YYYY')} </span>
                                                                    </div>
                                                                </div>
                                                                </Link>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) :<div> 
                                                <p> Data No Found </p>
                                            </div>} 

                                    </div>
                                </Col>
                                
                                
                                <Col lg={3}>
                                    <div className="footer_s_one">
                                        {/* <img src={Flogo} alt="logo"></img> */}
                                        <div className="h3_footer">
                                            <h3> Contact Us  </h3>
                                        </div> 
                                        <p> {settings_data.address} </p>
                                        <span>  <FaPhoneAlt /> {settings_data.phone} </span>
                                        <span>  <FaRegEnvelope /> {settings_data.email} </span>
                                        <div className="social_icon">
                                            
                                            <a target="_blank" href={settings_data.facebook}><FaFacebookF /></a>
                                            <a target="_blank" href={settings_data.linkedin}><FaLinkedinIn /></a>
                                            {/* <a target="_blank" href=""> <FaTwitter /> </a>
                                            <a target="_blank" href=""> <FaYoutube /></a> */}

                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <div className="footer_bottom">
                            Copyright©2021 by <a target="_blank" href="http://infinfotech.com/"> Infinity Infotech Ltd.  </a> | All rights reserved 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;