import { Routes, Route } from "react-router-dom";
import HOC from "../helpers/HOC";

// Homepage
import Home from "../Components/Pages/Home";

// Bookmark management
import Bookmark from "../Components/Pages/Bookmark/Index";
import BookmarkAddForm from "../Components/Pages/Bookmark/AddForm";

// Admin management
import Admin from "../Components/Pages/Admin/Index";
import UserTable from "../Components/Pages/Admin/User/Index";
import Addform from "../Components/Pages/Admin/User/AddForm";
import UserDetail from "../Components/Pages/Admin/User/Detail";
import ResetPasswordFormAdmin from "../Components/Pages/Admin/User/ResetPasswordForm";
import ChangeMailForm from "../Components/Pages/Admin/User/ChangeMailForm";

// User Management
import User from "../Components/Pages/User/Index";
import Signout from "../Components/Pages/User/Signout";
import Signup from "../Components/Pages/User/Signup";
import Profile from "../Components/Pages/User/Profile";
import ResetPasswordFormUser from "../Components/Pages/User/ResetPasswordForm";
import ChangeAliasFormUser from "../Components/Pages/User/ChangeForm";



function Router() {
    return (
        <Routes>

            <Route index path="/" element={<Home />} />
            <Route index path="home" element={<Home />} />

            <Route path="portal" element={<HOC child={Bookmark} isAuthRequired={true} />}>
            <Route path="add" element={<HOC child={BookmarkAddForm} isAuthRequired={true} />} />
            </Route>

            <Route path="user" element={<User />}>
                <Route path="signup" element={<Signup />} />
                <Route path="signout" element={<Signout />} />
                <Route path="profile" element={<HOC child={Profile} isAuthRequired={true} />} />
                <Route path="profile/reset_password" element={<HOC child={ResetPasswordFormUser} isAuthRequired={true} />} />
                <Route path="profile/change_alias" element={<HOC child={ChangeAliasFormUser} isAuthRequired={true} />} />
            </Route>

            <Route path="admin" element={<HOC child={Admin} isAuthRequired={true} />}>
                <Route path="user/add" element={<HOC child={Addform} isAuthRequired={true} />} />
                <Route path="user/all" element={<HOC child={UserTable} isAuthRequired={true} />} />
                <Route path="user/detail/:uuid" element={<HOC child={UserDetail} isAuthRequired={true} />} />
                <Route path="user/detail/:uuid/reset_password" element={<HOC child={ResetPasswordFormAdmin} isAuthRequired={true} />} />
                <Route path="user/detail/:uuid/change_mail" element={<HOC child={ChangeMailForm} isAuthRequired={true} />} />
            </Route>

        </Routes>
    );
}

export default Router;
