import { useState } from "react";
import UserIsFollowCom from "../Component/UserIsFollowCom";
import { search } from "../ServerMehtods/CRUD";


export default function SearchScreen() {
    const [SearchUser, setSearchUser] = useState("")

    let [state, setstate] = useState([])
    async function SearchItemMethod() {
        const searchresults = await search(SearchUser)
        if (searchresults !== null) {
            console.log("REC : ", searchresults)
            setstate(searchresults)
        } else {
            console.log("User not found")
        }
    }

    return (
        <div className="SearchScreen">
            <div className="SearchScreenFC">
                <div className="SearchScreenFCDIV"><input placeholder="Search" className="SearchScreenFCInput" onChange={(e) => setSearchUser(e.target.value)} /></div>
                <div className="SearchScreenSCDIV"><button className="SearchScreenFCButton" onClick={SearchItemMethod}>Search</button></div>
            </div>
            {
                // console.log("STATE : ",(state.length),"State data : ",state)
                (state.length > 0 ?
                    <div className="SearchScreenSC">
                        {
                            state.map(
                                (value, index) => {
                                    return (
                                        <UserIsFollowCom newFollowingid={value._id} name={value.name} owneremail={value.email} isFollowing={value.isFollowing} key={index} />
                                    )
                                }
                            )
                        }
                    </div>
                    :
                    null
                )
            }

        </div>
    )
}
