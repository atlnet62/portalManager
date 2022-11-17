import { Outlet, useLocation } from "react-router-dom";
import HOC from "../../../helpers/HOC";
import Dashboard from "./Dashboard";

function Main() {
    const location = useLocation;
    return location().pathname !== "/main" ? (
        <Outlet />
    ) : (
        <>
            <HOC child={Dashboard} />
        </>
    );
}

export default Main;
