import { Routes, Route } from "react-router-dom";
import HOC from "../helpers/HOC";

// Homepage
import Home from "../Components/Pages/Home";

// Main Management
    //A/ Bookmark
import MainPanel from "../Components/Pages/Main/Index";
import AddMenu from "../Components/Pages/Main/AddMenu";
import AddBookmarkForm from "../Components/Pages/Main/Bookmark/AddBookmarkForm";
    //B/ Category
import AddCategoryForm from "../Components/Pages/Main/Category/AddCategoryForm";

// Admin management
import Admin from "../Components/Pages/Admin/Index";
import UserList from "../Components/Pages/Admin/User/UserList";
import AddUserForm from "../Components/Pages/Admin/User/AddUserForm";
import UserDetail from "../Components/Pages/Admin/User/UserDetail";
import ResetPasswordFormAdmin from "../Components/Pages/Admin/User/ResetPasswordForm";
import ChangeMailFormAdmin from "../Components/Pages/Admin/User/ChangeMailForm";

// User Management
import Signout from "../Components/Pages/User/Signout";
import Signup from "../Components/Pages/User/Signup";
import User from "../Components/Pages/User/Index";
import Profile from "../Components/Pages/User/Profile";
import ResetPasswordFormUser from "../Components/Pages/User/ResetPasswordForm";
import ChangeAliasFormUser from "../Components/Pages/User/ChangeAliasForm";

function Router() {
    return (
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="home" element={<Home />} />

            <Route path="main" element={<HOC child={MainPanel} isAuthRequired={true} />}>
                <Route path="add" element={<HOC child={AddMenu} isAuthRequired={true} />} />
                <Route path="bookmark/add" element={<HOC child={AddBookmarkForm} isAuthRequired={true} />} />
                <Route path="category/add" element={<HOC child={AddCategoryForm} isAuthRequired={true} />} />
            </Route>

            <Route path="user" element={<User />}>
                <Route path="signup" element={<Signup />} />
                <Route path="signout" element={<Signout />} />
                <Route path="profile" element={<HOC child={Profile} isAuthRequired={true} />} />
                <Route path="profile/reset_password" element={<HOC child={ResetPasswordFormUser} isAuthRequired={true} />} />
                <Route path="profile/change_alias" element={<HOC child={ChangeAliasFormUser} isAuthRequired={true} />} />
            </Route>

            <Route path="admin" element={<HOC child={Admin} isAuthRequired={true} />}>
                <Route path="user/all" element={<HOC child={UserList} isAuthRequired={true} />} />
                <Route path="user/add" element={<HOC child={AddUserForm} isAuthRequired={true} />} />
                <Route path="user/detail/:uuid" element={<HOC child={UserDetail} isAuthRequired={true} />} />
                <Route path="user/detail/:uuid/reset_password" element={<HOC child={ResetPasswordFormAdmin} isAuthRequired={true} />} />
                <Route path="user/detail/:uuid/change_mail" element={<HOC child={ChangeMailFormAdmin} isAuthRequired={true} />} />
            </Route>
        </Routes>
    );
}

export default Router;
