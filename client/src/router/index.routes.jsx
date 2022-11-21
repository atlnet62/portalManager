import { Routes, Route } from "react-router-dom";
import HOC from "../helpers/HOC";

// without login
import Home from "../Components/Pages/Home";
import Contact from "../Components/Pages/Contact";
import Error from "../Components/Pages/Error";

// Main Management
//A/ Bookmark
import MainPanel from "../Components/Pages/Main/Index";
import AddMenu from "../Components/Pages/Main/AddMenu";

// Admin management
import Admin from "../Components/Pages/Admin/Index";
import UserDetail from "../Components/Pages/Admin/User/UserDetail";
import ResetPasswordFormAdmin from "../Components/Pages/Admin/User/ResetPasswordForm";

// User Management
import Signout from "../Components/Pages/User/Signout";
import Signup from "../Components/Pages/User/Signup";
import User from "../Components/Pages/User/Index";
import Profile from "../Components/Pages/User/Profile";
import ResetPasswordFormUser from "../Components/Pages/User/ResetPasswordForm";
import ValidateAccount from "../Components/Pages/User/ValidateAccount";

function Router() {
    return (
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="home" element={<Home />} />
            <Route index path="contact" element={<Contact />} />

            <Route path="main" element={<HOC child={MainPanel} isAuthRequired={true} />}>
                <Route path="panel" element={<HOC child={AddMenu} isAuthRequired={true} />} />
            </Route>

            <Route path="user" element={<User />}>
                <Route path="signup" element={<Signup />} />
                <Route path="validate-account/:uuid" element={<ValidateAccount />} />
                <Route path="signout" element={<Signout />} />
                <Route path="profile" element={<HOC child={Profile} isAuthRequired={true} />} />
                <Route path="profile/reset_password" element={<HOC child={ResetPasswordFormUser} isAuthRequired={true} />} />
            </Route>

            <Route path="admin" element={<HOC child={Admin} isAuthRequired={true} />}>
                <Route path="user/detail/:uuid" element={<HOC child={UserDetail} isAuthRequired={true} />} />
                <Route path="user/detail/:uuid/reset_password" element={<HOC child={ResetPasswordFormAdmin} isAuthRequired={true} />} />
            </Route>

            <Route path="*" element={<Error message={"404 : Page not found !"} />} />
        </Routes>
    );
}

export default Router;
