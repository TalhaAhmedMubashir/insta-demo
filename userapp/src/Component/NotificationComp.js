export default function NotificationComp(props) {
    // console.log("DISPLAY PROP : ",props.display)
    return (
        <div className={(props.display ? "notificationDisplay" : "notificationDisplayNone")}>
            {
                (props.NoticationData? props.NoticationData.map((value,index)=><DisplayMessage name={value.name} message={value.message} key={index}/>):"Null")
            }
        </div>
    )
}

export function DisplayMessage(props){
    return (
        <div className="message">{props.name}{props.message}</div>
    )
}