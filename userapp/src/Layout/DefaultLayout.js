import { Outlet, useNavigate } from 'react-router-dom'
import { moveto } from '../Routes/Routes';
import NotificationComp from '../Component/NotificationComp';
import { useState, useEffect } from "react"
import { getNotification, updateNotificationStatus } from '../ServerMehtods/CRUD';


export default function Defaultlayout() {
    const navigate = useNavigate();
    const [display, setdisplay] = useState(false)
    const [NoticationData, setNoticationData] = useState([])
    // const [NoticationAlert, setNoticationAlert] = useState(false)

    async function displaynotification() {
        if (display) {
            setdisplay(false)
            await updateNotificationStatus()
        } else {
            if (NoticationData.length > 0) {
                setdisplay(true);
            }
            fetchNotifiction();
        }
    }

    useEffect(() => {
        fetchNotifiction();
    }, [])


    async function fetchNotifiction() {
        try {
            const searchresults = await getNotification();
            setNoticationData(searchresults);
        } catch (error) {
            console.log(error);
        }
    }

    function clearrecord() {
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('fullname')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('verificationToken');
        window.location.href = "/"
    }

    return (
        <div>
            <div className="nav">
                <div className="navFD">
                    <div className="navFDC"><button className="navTRIOButton" onClick={() => moveto("/userloggedin", null, navigate)}>Home</button></div>
                    <div className="navFDC"><button className="navTRIOButton" onClick={() => moveto("/userloggedin/followers", null, navigate)}>Followers</button></div>
                    <div className="navFDC"><button className="navTRIOButton" onClick={() => moveto("/userloggedin/following", null, navigate)}>Following</button></div>
                </div>
                <div className="navSD">
                    <h3 className='username'>
                        Hello! {sessionStorage.getItem("fullname").charAt(0).toUpperCase() + sessionStorage.getItem("fullname").slice(1)}
                    </h3>
                </div>
                <div className="navSD">
                    <div className="navFDC"><button onClick={displaynotification} className="navTRIOButton notificationAlert">Notification</button><NotificationComp display={display} NoticationData={NoticationData} /></div>
                    <div className="navFDC"><button onClick={clearrecord} className="navSDButton">Logout</button></div>
                </div>
            </div>
            <div className='outletScreen'>
                <Outlet />
            </div>
        </div>
    )
}