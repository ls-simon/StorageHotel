import React from "react";

const Dropdown = (props) =>{
    
    const {action, actors} = props;
    const actorList = actors.map((actor, i)=>{
     
        return(
            <option 
            key={i}
            value={actor.id+'&'+actor.name}
            name={actor.name}
            usertype={actor.userType}>
            {actor.name} - {actor.userType}
            </option>
         )
    })
    return(
        <select className="custom-select form-control" id="dropdown" onChange={action}>
            <option>Vælg kunde</option>
            {actorList}
        </select>  
    )
}
//Pass chosen actor to navbar or work around
export default Dropdown