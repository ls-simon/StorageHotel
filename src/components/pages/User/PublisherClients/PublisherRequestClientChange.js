import React from 'react';
import "../../Pages.css";
import { Link } from "react-router-dom"

const PublisherRequestClientChange = (props) => {

    return(
        <div className="PageStyle customText_b">
            <div className="frameBordering">
                <div className="col-md-6 offset-md-3">
                    <h1 className="customText_b_big">Request change to client:</h1>
                    <h1 className="customText_b">Please send an email to ???@???.dk to request change</h1>

                    <Link to="/User/Clients" className="btn std_BTN  btn-block btn-lg">Back to clients</Link>
                </div>
            </div>
        </div>
    );
}
 
export default PublisherRequestClientChange;