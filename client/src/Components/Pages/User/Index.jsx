import { Outlet, useLocation } from "react-router-dom";
import Signform from "./SignForm";

function Entry() {
    const location = useLocation;
    return location().pathname !== "/user" ? (
        <Outlet />
    ) : (
        <>
            <Signform formType={"signin"} />
        </>
    );
}

export default Entry;
