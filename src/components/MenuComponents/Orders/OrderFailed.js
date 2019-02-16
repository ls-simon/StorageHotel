import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";

class AdminOrderFailed extends React.Component {

    render() {
        
        if(!this.props.auth.uid){
           return <Redirect to="/"/>
        }

        return(
            <div className="PageStyle">
            <h1 className="title customText_b">Sorry, but the order was NOT sent to 4N</h1>
                <div className="orderInfoBox">
                    <Link to="/Admin/Orders/New" className="green_BTN btn-block btn my-2">TRY AGAIN</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(AdminOrderFailed);