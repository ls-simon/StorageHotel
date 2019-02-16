import React from "react";

export default class pushback extends React.Component{

    render(){

        this.props.history.goBack();
        
        return(
            <div></div>
        )
    }
}