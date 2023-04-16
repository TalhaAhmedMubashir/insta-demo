import { useEffect, useState } from "react";
import UserIsFollowCom from "../Component/UserIsFollowCom";
import { getFollowers } from "../ServerMehtods/CRUD";


export default function FollowersScreen() {
  const [state, setstate] = useState([])

  async function fetchFollowers() {
    try {
      const searchresults = await getFollowers();
      setstate(searchresults);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchFollowers();
  }, []);


  return (
    <div>
      <div className="hCSS"><h4 className="removemargin">Followers</h4></div>
      <div className="SearchScreenSC">
        {
          state?.map((value, index) => {
            return (<UserIsFollowCom name={value?.name} owneremail={value.email} isFollowing={value.following} key={index} />)
          }
          )
        }
      </div>
    </div>
  )
}