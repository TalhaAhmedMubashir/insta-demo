
export async function signupFunction(Credentials) {
  const response = await fetch('http://localhost:3002/appuser/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Credentials)
  }).catch((response) => { console.log("Catch error : ", response.message) })
  let data = await response.json()
  alert(data.message)
}

export async function signinFunction(Credentials) {
  const response = await fetch(
    'http://localhost:3002/appuser/signin',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Credentials)
    }
  ).catch((error) => console.log("Login error :", error.message))
  let data = await response.json()
  if (data.status === 200) {
    sessionStorage.setItem('id', data.user.id)
    sessionStorage.setItem('fullname', data.user.fullName)
    sessionStorage.setItem('email', data.user.email)
    sessionStorage.setItem('verificationToken', data.accessToken);
    
    return true
  }
  alert(data.message)
  return false
}

export async function search(name){
  const response = await fetch(
    'http://localhost:3002/appuser/search',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization':'Bearer '+sessionStorage.getItem('verificationToken'),
      },
      body: JSON.stringify({name,email:sessionStorage.getItem('email'),id:sessionStorage.getItem('id')})
    }).catch((error) => console.log("Search error :", error.message))

    let searchresult = await response.json()
    return searchresult.foundresult
}

export async function addorremovefollowing(UserData){
  console.log("REQ : ",UserData)
  if(UserData.isFollowing){
    //To Unfollow
    const response = await fetch(
      'http://localhost:3002/appuser/unfollow',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization':'Bearer '+sessionStorage.getItem('verificationToken'),
        },
        body: JSON.stringify({followingemail:UserData.owneremail,email:sessionStorage.getItem('email')})
      }).catch((error) => console.log("Search error :", error.message))
      let unfollowresponse = await response.json()
      return unfollowresponse
  }else{
    //To Follow
    const response = await fetch(
      'http://localhost:3002/appuser/addfollowing',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization':'Bearer '+sessionStorage.getItem('verificationToken'),
        },
        body: JSON.stringify({id:sessionStorage.getItem('id'),name:sessionStorage.getItem('fullname'),newFollowing:{id:UserData.newFollowingid,email:UserData.owneremail,name:UserData.name},email:sessionStorage.getItem('email')})
      }).catch((error) => console.log("Search error :", error.message))
      return await response.json()
      
  }

}

export async function getFollowers(){
  const response = await fetch(
    'http://localhost:3002/appuser/getfollowers',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization':'Bearer '+sessionStorage.getItem('verificationToken'),
      },
      body: JSON.stringify({email:sessionStorage.getItem('email')})
    }).catch((error) => console.log("Search error :", error.message))

    let searchresult = await response.json()
    console.log("App Followers : ",searchresult)
    return searchresult
}

export async function getFollowing(){
  const response = await fetch(
    'http://localhost:3002/appuser/getfollowing',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization':'Bearer '+sessionStorage.getItem('verificationToken'),
      },
      body: JSON.stringify({email:sessionStorage.getItem('email')})
    }).catch((error) => console.log("Search error :", error.message))

    let searchresult = await response.json()
    return searchresult
}

export async function getNotification(){
  const response = await fetch(
    'http://localhost:3002/appuser/getnotification',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization':'Bearer '+sessionStorage.getItem('verificationToken'),
      },
      body: JSON.stringify({email:sessionStorage.getItem('email')})
    }).catch((error) => console.log("Search error :", error.message))

    let searchresult = await response.json()
    console.log("GET Notification : ",searchresult)
    return searchresult
}

export async function updateNotificationStatus(){
  console.log("updateNotificationStatus called")
  const response = await fetch(
    'http://localhost:3002/appuser/updateNotificationStatus',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization':'Bearer '+sessionStorage.getItem('verificationToken'),
      },
      body: JSON.stringify({email:sessionStorage.getItem('email'), status:true})
    }).catch((error) => console.log("Search error :", error.message))

    let searchresult = await response.json()
    return searchresult.foundresult
}