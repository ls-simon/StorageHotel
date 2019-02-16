import React from "react";

const Alert = (props) =>{
    
    let display = props.show;
    
    const mainAlert = () => {

        return((display)?(
        
            <div class="alert alert-warning" role="alert">
                You are deleting: {props.name}
                <button className="btn">delete</button>
                <button className="btn">cancel</button>
            </div>
        )
        :
            <div></div>
        )
    }

    return(
        <div>
            {mainAlert}
        </div>
    )
}

export default Alert;