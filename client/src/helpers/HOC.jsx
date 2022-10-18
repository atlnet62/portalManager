import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkToken } from "../services/API/user.js";
import { signin, signout } from "../store/slices/user.slice";

function HOC({ child, isAuthRequired }) {
    
    const navigate = useNavigate();
    const Child = child;
    const dispatch = useDispatch();
    const { userInfos, isLogged } = useSelector((state) => ({
        ...state.user,
    }));

    useEffect(() => {
        async function checkAuth() {
            const TOKEN = localStorage.getItem("uat");

            if (isAuthRequired && !TOKEN) {
                dispatch(signout());
                navigate("/");
            }

            if (!isLogged) {
                if (isAuthRequired) navigate("/");
                if (TOKEN !== null) {
                    const response = await checkToken(TOKEN);
                    if (response.status === 200) {
                        // userDatas est recuperer du back
                        dispatch(signin(response.data.userDatas));
                    }
                }
            }
        }
        checkAuth();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Child userInfos={userInfos} />
        </>
    );
}

export default HOC;
