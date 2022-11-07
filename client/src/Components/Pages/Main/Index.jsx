import { Outlet, useLocation } from "react-router-dom";
import HOC from "../../../helpers/HOC";
import MainPanel from "./Panel";

function Main() {
    const location = useLocation;
    return location().pathname !== "/main" ? (
        <Outlet />
    ) : (
        <>
            <HOC child={MainPanel} />
        </>
    );
}

export default Main;
