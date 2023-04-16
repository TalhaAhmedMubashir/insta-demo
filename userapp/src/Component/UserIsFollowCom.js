import { useState } from "react";
import { addorremovefollowing } from "../ServerMehtods/CRUD";

export default function UserIsFollowCom(props){
    const [status, setstatus] = useState(props.isFollowing)
    console.log("status : ",status)
    function addorremovefollowinguser(){
        addorremovefollowing(props)
        setstatus(!status)
    }
    return(
        <div className="UserIsFollowCom">
            <div className="UserIsFollowComFC">{props.name.charAt(0).toUpperCase()+props.name.slice(1)}</div>
            <div className="UserIsFollowComSC"><button onClick={addorremovefollowinguser} className="navSDButton">{(status?"Following":"Follow")}</button></div>
        </div>
    )
}