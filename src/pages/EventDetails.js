import React, { Component } from 'react';
import axios from "axios";
// import EventBg from "../images/eventBg.jpg";
import { Container, Row, Col } from 'react-bootstrap';
import config from "../config"

class EventDetails extends Component {
    constructor(props){
        super(props);
        this.state= {
            eventDetails:[],
        }
    }
    componentDidMount() {
        const sid = this.props.match.params.slug
        
        // console.log(apiVar+'asfhgdfhasfdhga',sid);
        axios.get('http://unimustbd.com/admin/api/v1/eventview/'+sid,{
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }).then(res => {
            this.setState({
                eventDetails: res.data
            });
        })
      }
    render() {



        const { eventDetails  } = this.state
        const baseurl = config.BpiUrl


        let singledata = []
        if(eventDetails.data){
            singledata = eventDetails.data
        }else {
            singledata = []
        }

        console.log("singledata", singledata)

        return (
            <div>
                <div className="event_details_Banner">
                {/* apiVar */}
                    {/* <img src={EventBg} alt="eventbg"></img> */}
                    <img src={baseurl+singledata.thumbnail} alt="eventbg"></img>
                    <h1> {singledata.title}  </h1>
                    <p> Home // Events </p>
                </div>
                
                <div className="event_box_details_aal">
                    <Container>
                        <Row>
                            <Col lg={12}>
                            <div className="event_box_details">
                                {/* <div className="event___box_img">
                            <img src={"http://103.205.180.178/unimustbd/admin/"+singledata.thumbnail} alt=""></img>

                                </div> */}
                            {/* <img src={"http://103.205.180.178/unimustbd/admin/"+user.photo} alt="images"></img> */}
                            {/* <h1> {singledata.slug}   </h1> */}
                            <div className="e__text" dangerouslySetInnerHTML={{ __html: singledata.details }} />
                            </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default EventDetails;