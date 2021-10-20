import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from "../../images/logo.png";
import { Link } from "react-router-dom";

import { Menu, Dropdown } from 'antd';
import { VscListSelection } from "react-icons/vsc";
import { Drawer } from 'antd';
import { VscChromeClose, VscChevronRight } from "react-icons/vsc";
import axios from "axios";
import config from "../../config"

// VscChromeClose

const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/medical-tourism">
            Medical Tourism Service
        </Link>
      </Menu.Item>
    
    </Menu>
  );


class Header extends Component {
    constructor(props) {
        super(props)
        this.state= {
            visible: false, 
            placement: 'left' ,
            settings: []
        }
    }
       // Menu Scrolled 
    componentDidMount(){


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


        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 100;
            if(isTop !== true){
                this.setState({ scrolled: true });
            } else {
                this.setState({ scrolled: false })
            }
        });
    }
    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
        });
      };
    
      onChange = e => {
        this.setState({
          placement: e.target.value,
        });
      };
    render() {
        const {  } = this.state
        const { placement, visible, settings } = this.state;
        const baseurl = config.BpiUrl
        let alldata = []
        // Country
        if(settings.data){
            alldata = settings.data
        }else {
            alldata = []
        }
        return (
            <div className={this.state.scrolled ? 'nav scrolled' : 'nav'}>
                <div className="header_area">
                    <Container>
                        <Row>
                            <Col lg={3}>
                                <Link to="/">
                                    {/* <img className="logo" src={Logo} alt="logo"></img> */}
                                    <img className="logo" src={baseurl+alldata.logo} alt="logo"></img>
                                    <VscListSelection className="rasponsiveNav" onClick={this.showDrawer} />
                                </Link>
                            </Col>
                            <Col lg={9}>
                                <div className="menu_area">
                                    <div className="list_link">
                                        <Link to="/student-consultancy"> Student Consultancy </Link>
                                        <Link to="/visa-consultancy"> Migration Consultancy </Link>
                                        <Dropdown overlay={menu} placement="bottomCenter" arrow>
                                            <p> Other Services </p>
                                        </Dropdown>
                                        <Link to="/about-us"> About us </Link>
                                    </div>

                                    <Link className="appointment" to="/get-appointment"> Get Appointment  </Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Drawer
                    placement={placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={visible}
                    key={placement}
                    >
                        <Link onClick={this.onClose} to="/"><img className="logo_rasponsive" src={Logo} alt="logo"></img></Link>
                        <VscChromeClose className="rasponsive_close" onClick={this.onClose} />
                        <div className="rasponsive_menu_list">
                        <Link onClick={this.onClose} to="/student-consultancy"> <VscChevronRight /> Student Consultancy </Link>
                        <Link onClick={this.onClose} to="/visa-consultancy"> <VscChevronRight /> Visa and Migration Consultancy </Link>
                        
                        <Dropdown overlay={menu} placement="bottomCenter" arrow>
                            <p> <VscChevronRight />  Other Menu </p>
                        </Dropdown>

                        <Link onClick={this.onClose} to="/about-us"> <VscChevronRight /> About us </Link>
                        <Link onClick={this.onClose} className="appointment menu_rasponsive_last" to="/get-appointment"> Get Appointment  </Link>

                        </div>
                </Drawer>
            </div>
        );
    }
}

export default Header;