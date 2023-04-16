import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserCredentials from '../Screen/UserCredentialsScreen';
import SearchScreen from '../Screen/SearchScreen';
import FollowersScreen from '../Screen/FollowersScreen';
import FollowingScreen from '../Screen/FollowingScreen';
import Defaultlayout from '../Layout/DefaultLayout';

export default function AppRouting() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserCredentials />}></Route>
                <Route path="/userloggedin" element={<Defaultlayout />}>
                    <Route index element={<SearchScreen />} />
                    <Route path='/userloggedin/followers' element={<FollowersScreen/>}></Route>
                    <Route path='/userloggedin/following' element={<FollowingScreen/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


export function moveto(navigateto, recData= null, navigateObject) {
    let url = { pathname: `${navigateto}` }
    if (recData !== null) {
        url = { ...url, search: `?data=${encodeURIComponent(JSON.stringify(recData))}` }
    }
    navigateObject(url);
}