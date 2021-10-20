import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import { FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

import  { articlesList }  from "../services/actions/articlesAction";
import { connect } from "react-redux";
import Moment from 'moment';
import config from "../config"
import axios from 'axios';

var striptags = require('striptags');
class Blog extends Component {
    constructor(props){
        super(props);
        this.state= {
            articlesList: [],
            loading: '',
            error:[],
            aboutapi:[],
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
        this.props.articlesList();
      }

    render() {
        const baseurl = config.BpiUrl
        const { articldata } = this.props;
        const { aboutapi } = this.state;

        let alldata = []
        let title_data = []
        let articles_data = []

        if(articldata.data){
            alldata = articldata.data
        }else {
            alldata = []
        }

        if(aboutapi.data){
            title_data = aboutapi.data
        }else {
            title_data = []
        }
        if(title_data.articles){
            articles_data = title_data.articles
        }else {
            articles_data = []
        }


        console.log("aboutapi aboutapi ", articles_data)

        return (
            <div className="blog_div">
                <div className="blog_area">
                    <div className="blog_header">
                        <h5> {articles_data.title}  </h5>
                        
                        <h2> <div dangerouslySetInnerHTML={{ __html: articles_data.sort_desc }} /> </h2>
                    </div>
                </div>
                <Container>


                {alldata.length >0? ( <OwlCarousel 
                        className="owl-theme blog_carousel" 
                        loop 
                        margin={10} 
                        nav={false}
                        dots={false}
                        autoplay={true}
                        autoplayTimeout={4000}
                        autoplayHoverPause={true}
                        responsive={this.state.responsive}
                    >
                        {alldata.map((user, i) => {
                            return (
                                <div key={i} >
                                    <div className="item"  > 
                                        <Link to={`/block-details/${user.slug}`}>
                                        <div className="single-blog-post">
                                            <div className="post-image">
                                                {/* <img src={process.env.PUBLIC_URL+'/images/b01.jpg'} alt="country"></img> */}
                                                <img src={baseurl+user.photo} alt="images"></img>
                                            </div>
                                            <div className="post-content">
                                                <div className="date">
                                                    <FiCalendar />
                                                    <span>{Moment(user.created_at).format('DD MMM YYYY')}</span>
                                                </div>
                                                <h3> {user.title} </h3>
                                                <p>{striptags(user.description.substring(0,200),'')}....</p>
                                                {/* <p>{user.description}</p> */}
                                                <button className="default-btn">Read More</button>
                                            </div>
                                        </div>
                                        </Link>
                                    </div>
                                </div>
                            );
                    })}
                    </OwlCarousel>
                    ) :""} 

                
                </Container>
            </div>
        );
    }
}

// export default Blog;

const mapStateToProps = (state) => ({ 
    loading: state.articlesReducer.loading,
    articldata: state.articlesReducer.articldata,
    error: state.articlesReducer.error
});

const mapDispacthToProps = dispatch => {
    return {
        articlesList: () => dispatch(articlesList())    
    };
  
  };

  export default connect(
    mapStateToProps,
    mapDispacthToProps
  )(Blog);







