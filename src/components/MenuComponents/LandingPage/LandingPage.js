import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";

const LandingPage = (props)=>{
    
    const {name,buttons}=props;
    const buttonList = buttons.map(button =>{

        return (
            <div className="col" key={button.id}>
                <Link 
                    to={button.location}  
                    className="std_BTN LandingPageButtons btn btn-dark btn-lg border border-secondary rounded" 
                    role="button">
                    {button.name}
                </Link>
            </div>
        )
    })
    return(
        <div className="container">
            <div className="fixed-top LandingText">
                <h1 className="customText_b_medium">Welcome {name}!</h1>
                <br/>
                <div className="row mt-6">
                    {buttonList}
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
