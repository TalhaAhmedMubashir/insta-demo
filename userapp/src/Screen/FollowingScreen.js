import { useEffect, useState } from "react";
import UserIsFollowCom from "../Component/UserIsFollowCom";
import { getFollowing } from "../ServerMehtods/CRUD";

export default function FollowingScreen() {
  const [state, setstate] = useState([])

  async function fetchFollowing() {
    try {
      const searchresults = await getFollowing();
      console.log("Following Screen Search : ",searchresults)
      if(searchresults !== null){
        setstate(searchresults.following);
      }

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchFollowing();
  }, []);

  return (
    <div>
      <div className="hCSS"><h4 className="removemargin">Following</h4></div>
      <div className="SearchScreenSC">
        {console.log("Following state : ", state.length)}

        {state && state.length > 0 ? state?.map((value, index) => {
          return (<UserIsFollowCom name={value?.name} owneremail={value.email} isFollowing={true} key={index} />
          )
        }
        ) : null}
      </div>
    </div>
  )
}