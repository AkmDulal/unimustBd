import React, { Component } from 'react';
import Banner from "../components/Banner";
import Country from "../components/Country";
import Event from "../components/Event";
import BlogComponents from "../components/Blog";
class Home extends Component {
    render() {
        return (
            <div>
                <Banner />
                <Country />
                <Event />
                <BlogComponents />
            </div>
        );
    }
}

export default Home;