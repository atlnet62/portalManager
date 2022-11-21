import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../../store/slices/user.slice";
import Cookies from "js-cookie";

function SignOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem("uat");
        Cookies.remove("uat");
        dispatch(signout());
        navigate("/user");
        window.location.reload(false);
        // eslint-disable-next-line
    }, []);

    return null;
}

export default SignOut;
