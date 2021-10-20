import React, { PureComponent } from 'react'

import LoadingImg from "../images/loading.gif";


class Loading extends PureComponent {


    render() {
        return (
            <div className="loading__area">
                <img src={LoadingImg} alt="loading"></img>
            </div>
        )
    }
}

export default Loading