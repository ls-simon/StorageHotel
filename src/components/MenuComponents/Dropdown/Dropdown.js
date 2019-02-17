import React from "react";

const Dropdown = (props) =>{
    
    const {action, actors} = props;
    const actorList = actors.map((actor, i)=>{
     
        return(
            <option 
            key={i}
            value={actor.id}
            name={actor.name}
            usertype={actor.userType}>
            {actor.name} - {actor.userType}
            </option>
         )
    })
    return(
        <select className="custom-select form-control" id="dropdown" onChange={action}>
            <option>Choose Customer</option>
            {actorList}
        </select>  
    )
}

export default Dropdown