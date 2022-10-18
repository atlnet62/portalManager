import { Outlet, useLocation } from "react-router-dom";
import HOC from "../../../helpers/HOC";
import Panel from "./Panel";

function Admin() {
    const location = useLocation;
    return location().pathname !== "/admin" ? (
        <Outlet />
    ) : (
        <>
            <HOC child={Panel} />
        </>
    );
}

export default Admin;
