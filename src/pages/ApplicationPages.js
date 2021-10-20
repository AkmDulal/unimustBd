import React, { PureComponent } from 'react'
import ApplicatonImg from "../images/application_img.png";
import { Link } from "react-router-dom";
import axios from "axios";
import 'sweetalert/dist/sweetalert.css';
import SweetAlert from 'sweetalert-react';
import config from "../config"

class ApplicationPages extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            fields: {
              firstName: "",
              email: "",
              message: "",
              mobile: ""
            },
            
            errors: {
                firstName: "",
                email: "",
                mobile: ""
            },
            sent: false,
          };
    }
    validate = (name, value) => {
        const { fields } = this.state;
        switch (name) {
          case "firstName":
            if (!value || value.trim() === "") {
              return "First name is Required";
            } else {
              return "";
            }
          case "email":
            if (!value) {
              return "Email is Required";
            } else if (
              !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
            ) {
              return "Enter a valid email address";
            } else {
              return "";
            }
          case "mobile":
            if (!value || value.trim() === "") {
              return "Mobile number is Required";
            } else if (!value.match(/^[0-9]\d{10}$/)) {
              return "Enter a valid mobile number.";
            } else {
              return "";
            }
          default: {
            return "";
          }
        }
      };

      handleUserInput = e => {
        this.setState({
          errors: {
            ...this.state.errors,
            [e.target.name]: this.validate(e.target.name, e.target.value)
          },
          fields: {
            ...this.state.fields,
            [e.target.name]: e.target.value
          }
        });
      };

      handleSubmit = e => {
        const { fields } = this.state;
        this.setState({
          show: true
        })
        e.preventDefault();
        let validationErrors = {};
        this.refs.form.reset();
        Object.keys(fields).forEach(name => {
          const error = this.validate(name, fields[name]);
          if (error && error.length > 0) {
            validationErrors[name] = error;
          }
        });
        if (Object.keys(validationErrors).length > 0) {
          this.setState({ errors: validationErrors });
          return;
        }
        if (fields.firstName && fields.email && fields.message && fields.mobile) {
          const sid = this.props.match.params.slug
          const data = {
          name: fields.firstName,
          email: fields.email,
          message: fields.message,
          mobile: fields.mobile,
          course_slug: sid
        };
        // API 
        const apiVar = config.apiUrl
        axios.post('http://unimustbd.com/admin/api/v1/visitormessage',data, {
          headers: {
          'Key': 'QGluZiNpbmZvdGVjaCM=',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
            }).then(res=>{
              this.setState({
                // show: true
              })
          }).catch(()=>{
              console.log('message not sent')
          })
        }
        
        

      };

    render() {
        const { fields, errors } = this.state;
        console.log('send', this.state.testdata)
        return (
            <div>

            <SweetAlert
              show={this.state.show}
              icon= 'info'
              title="Success"
              text="Email has been send successfully"
              onConfirm={() => this.setState({ 
                show: false,
              }, window.location = "http://unimustbd.com")}
            />
                
                    <div className="login-26">
                        <div className="container">
                            <div className="col-md-12">
                                <div className="row login-box-6">
                                    <div className="col-lg-6 col-md-12 col-sm-12 col-pad-0 align-self-center none-992">
                                        <img src={ApplicatonImg} alt="okk"></img>
                                    </div>


                                    <div className="col-lg-6 col-md-12 col-sm-12 col-pad-0 align-self-center">
                                        <div className="login-inner-form">
                                        <div className="details">
                                            <h3>Application Form</h3>
                                            <form ref="form" onSubmit={this.handleSubmit} >
                                                <div className="form-group">
                                                    <input type="text" 
                                                        name="firstName"
                                                        value={fields.firstName}
                                                        onChange={event => this.handleUserInput(event)}
                                                        className="input-text" 
                                                        placeholder="Full Name">
                                                    </input>

                                                    <div>
                                                    <span className="text-danger">{errors.firstName}</span>
                                                </div>
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" 
                                                        name="email"
                                                        value={fields.email}
                                                        onChange={event => this.handleUserInput(event)}
                                                        placeholder="Email Address" className="input-text" 
                                                        placeholder="Email Address">
                                                    </input>
                                                    <div>
                                                        <span className="text-danger">{errors.email}</span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input type="number" 
                                                        name="mobile"
                                                        value={fields.mobile}
                                                        onChange={event => this.handleUserInput(event)}
                                                        placeholder="Mobile Number"
                                                        className="input-text">
                                                    </input>
                                                    <div>
                                                        <span className="text-danger">{errors.mobile}</span>
                                                    </div>
                                                </div>

                                                <div className="form-group">

                                                    <textarea
                                                    name="message"
                                                    value={fields.message}
                                                      onChange={event => this.handleUserInput(event)}
                                                        placeholder="Message"
                                                        className="input-text text_tares"
                                                    />
                                                    <div>
                                                        <span className="text-danger">{errors.message}</span>
                                                    </div>
                                                </div>
                                                <div className="form-group btn-box w_100">
                                                <button type="submit" onClick={this.handleSubmit} className="theme-btn btn-style-two"><span className="txt">Submit</span></button>
                                                    {/* <button type="submit"  class="btn-md btn-theme btn-block">Login</button> */}
                                                </div>
                                            </form>
                                            {/* <p>Don't have an account?<Link to="/"> Register here</Link></p> */}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* <h1>  ApplicationPages</h1> */}
            </div>

        )
    }
}

export default ApplicationPages