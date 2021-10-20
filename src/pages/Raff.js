import React, { Component } from 'react';

import BigCalendar from "react-big-calendar";
import moment from "moment";

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import Moment from 'moment';

import axios from 'axios';
import { compose } from 'redux';

import 'sweetalert/dist/sweetalert.css';
import SweetAlert from 'sweetalert-react';

import config from "../config"


require("react-big-calendar/lib/css/react-big-calendar.css");
BigCalendar.momentLocalizer(moment);

class GetAppointmentNew extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      start: "",
      end: "",
      topics: [],
      openSlot: false,
      openEvent: false,
      clickedEvent: {},
      datalist: [],
      appointmentDetails: []
      

    };
    this.handleSlotSelected = this.handleSlotSelected.bind(this);
    // this.handleEventSelected = this.handleEventSelected.bind(this);

  }
  closemodal = () => {
    this.setState({ openEvent: false, openSlot: false });
  }

  submitapoinment = (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let data = {
      appoin_time: formdata.get('date'),
      fullname: formdata.get('fullname'),
      email: formdata.get('email'),
      mobile: formdata.get('phone'),
      topics: formdata.get('topics'),
      message: formdata.get('message')
    }

    this.refs.form.reset();
    this.setState({ openEvent: false, openSlot: false });
    const apiVar = config.apiUrl
    axios.post('/admin/api/v1/appointment', data , {
      headers: {
      'Key': 'QGluZiNpbmZvdGVjaCM=',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    }).then(res=>{
              this.setState({
                postList: res.data
              })
          }).catch(()=>{
              console.log('Application not sent')
        })

  }

  componentDidMount() {
    const apiVar = config.apiUrl
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
  // appointmentlist

  setTitle(e) {
    this.setState({ topics: e });
  }

  setDescription(e) {
    this.setState({ desc: e });
  }

  handleSlotSelected(slotInfo) {
    console.log("Real slotInfo", slotInfo);
    this.setState({
      topics: slotInfo.topics,
      start: slotInfo.start,
      end: slotInfo.end,
      openSlot: true
    });
  }


  setNewAppointment() {
    const { start, end, topics} = this.state;
    let appointment = { start, end, topics };
    let events = this.state.events.slice();
    events.push(appointment);
    localStorage.setItem("events", JSON.stringify(events));
    this.setState({ events });
  }



  render() {

    
    

    const { datalist, appointmentDetails  } = this.state
        let singledata = []
        let appointmentdata = []
        if(datalist.data){
            singledata = datalist.data
        }else {
            singledata = []
        }

        if(appointmentDetails.data){
          appointmentdata = appointmentDetails.data
        }else {
          appointmentdata = []
        }



        console.log("All data",appointmentdata)



    return (
      <div className="calander_area">
        <div className="container-fluid">
          <BigCalendar
            // events={this.state.events}
            events={this.state.events}
            views={["week", "day",]}
            timeslots={2}
            defaultView="week"
            defaultDate={new Date()}
            selectable={true}
            // onSelectEvent={event => this.handleEventSelected(event)}
            onSelectSlot={slotInfo => this.handleSlotSelected(slotInfo)}
          />




            <SweetAlert
              show={this.state.show}
              icon= 'info'
              title="Appointment"
              text="appointment Request has been successfully submited"
              onConfirm={() => this.setState({ 
                show: false,
              }, window.location = "http://unimustbd.com")}
            />

          <Dialog  onClose={this.closemodal} open={this.state.openSlot}>
            <form onSubmit={this.submitapoinment} ref="form">
              <DialogTitle >{`Book an appointment on ${moment(this.state.start).format(
                "MMMM Do YYYY"
              )}`}</DialogTitle>
              <DialogContent>

                <div className="form-group">
                  <input type="text" className="input-text input_text_calander" name="date" value={Moment(this.state.start).format('DD-MM-YYYY h:mm a')} id="exampleInputEmail1" aria-describedby="emailHelp" readOnly></input>
                </div>

                <div className="form-group">
                  <input 
                  type="text" 
                  name="fullname" 
                  onChange={e => {
                      this.setTitle(e.target.value);
                    }} 
                    className="input-text input_text_calander" 
                    placeholder="Full Name" required ></input>
                </div>

                <div className="form-group">
                  <input type="text" name="email" className="input-text input_text_calander" placeholder="Email" required></input>
                </div>

                <div className="form-group">
                  <input type="text" name="phone" className="input-text input_text_calander" placeholder="Phone"  required></input>
                </div>

                <div className="form-group">
                  <select className="form-control" name="topics" className="input-text input_text_calander" id="exampleFormControlSelect1" required>
                    <option>Appointment Type</option>
                    <option> Student Consultancy</option>
                    <option> Migration Consultancy </option>
                    <option>Medical Tourism Service</option>
                  </select>
                </div>

                <div className="form-group">
                  <textarea name="message" className="input-text input_text_calander" placeholder="Message..." required></textarea>
                </div>

                <div className="form-group mt-2">
                  <button type="submit" onClick={() => {
                this.setNewAppointment();
              }} className="btn btn-primary mr-2 appl_btn">Submit</button>
                  {/* <button type="button" onClick={this.closemodal}  className="btn btn-danger">Cancel</button> */}
                  <button 
                  type="button" 
                  onClick={() => {
                    this.closemodal();
                  }} 
                  className="btn btn-danger appl_btn_clse">Cancel</button>
                </div>
              </DialogContent>
            </form >

          </Dialog>
        </div>
      </div>
    );
  }
}

export default GetAppointmentNew;