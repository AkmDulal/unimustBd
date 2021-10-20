import React, { Component } from 'react';
import ErrorImg from "../images/error.png" 
class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div>
            <img src={ErrorImg} alt="Images"></img>
        </div>  
        );
    }
}
 
export default Error;