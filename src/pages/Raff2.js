import React, { Component } from 'react'

import { render } from 'react-dom';
import events from './events';
import BigCalendar from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

moment.locale('en-GB');
BigCalendar.momentLocalizer(moment);

const allViews = Object
  .keys(BigCalendar.Views)
  .map(k => BigCalendar.Views[k])
  

export class GetAppointment extends Component {
    constructor() {
        super();
        this.state = {
          appointmentDetails: []
        };
    
      }

    componentDidMount() {
        // const apiVar = config.apiUrl
        axios.get('/admin/api/v1/appointmentlist',{
            headers: {
            'Key': 'QGluZiNpbmZvdGVjaCM=',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }).then(res => {
            this.setState({
              appointmentDetails: res.data
            });
        })
      }
    render() {

        const { appointmentDetails  } = this.state
        let appointmentdata = []
  

        if(appointmentDetails.data){
          appointmentdata = appointmentDetails.data
        }else {
          appointmentdata = []
        }

        let cldata=[];
        appointmentdata.forEach((element,index) => {
            const arr =   {
                    'title': element.topics,
                    'start': element.appoin_time,
                    'end': element.appoin_end_time
              };
              if(index == 0){
                arr['allDay']= true;
              }
              cldata.push(arr);
             
        });
        // views={["week", "day",]}
        // timeslots={2}
        // defaultView="week"
        // defaultDate={new Date(2021, 8, 1)}
        // selectable={true}
       
        return (
            <div>
                 <div style={{ height: 700 }}>
                    <BigCalendar
                        events={cldata}
                        step={60}
                        views={allViews}
                        // views={["week", "day",]}
                        // defaultView="week"
                        selectable={true}
                        defaultDate={new Date(2021, 8, 1)}
                    />
                </div>
                
            </div>
        )
    }
}

export default GetAppointment