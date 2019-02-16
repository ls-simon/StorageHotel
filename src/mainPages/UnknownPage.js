import React from "react";
import "./mainPages.css";

const UnknownPage = (props)=>{
    
    return(
        <div>
            <div className="ErrorPage">
                <h1 className="ErrorText align-middle customText_b">ERROR: Page not found!</h1>
            </div>
        </div>
    )
}

export default UnknownPage;