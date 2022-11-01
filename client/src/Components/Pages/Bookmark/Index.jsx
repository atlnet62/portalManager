import { Outlet, useLocation } from "react-router-dom";
import HOC from "../../../helpers/HOC";
import Portal from "./Portal";

function Bookmark() {
    const location = useLocation;
    return location().pathname !== "/portal" ? (
        <Outlet />
    ) : (
        <>
            <HOC child={Portal} />
        </>
    );
}

export default Bookmark;