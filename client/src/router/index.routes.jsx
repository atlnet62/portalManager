import { Routes, Route } from "react-router-dom";

import Home from "../Components/Pages/Home";
import Portal from "../Components/Pages/Portal";

import User from "../Components/Pages/User/Index";
import Signout from "../Components/Pages/User/Signout";
import Signup from "../Components/Pages/User/Signup";
import Profile from "../Components/Pages/User/Profile";

import Admin from "../Components/Pages/Admin/Index";
import UserTable from "../Components/Pages/Admin/User/Index";

import HOC from "../helpers/HOC";
import Detail from "../Components/Pages/Admin/User/Detail";

function Router() {
    return (
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="home" element={<Home />} />
            <Route path="portal" element={<HOC child={Portal} />}>
                {/* <Route path="" element={<HOC child={Form} />} /> */}
            </Route>


            <Route path="user" element={<User />}>
                <Route path="signup" element={<Signup />} />
                <Route path="signout" element={<Signout />} />
                <Route path="profile" element={<HOC child={Profile} isAuthRequired={true} />} />
            </Route>

            <Route path="admin" element={<HOC child={Admin} isAuthRequired={true} />}>
                <Route path="user/all" element={<HOC child={UserTable} isAuthRequired={true} />} />
                <Route path="user/detail/:uuid" element={<HOC child={Detail} isAuthRequired={true} />} />
            </Route>
        </Routes>
    );
}

export default Router;
