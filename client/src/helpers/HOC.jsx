import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Error from "../Components/Pages/Error";
import Loading from "../Components/UI/Elements/Loading";

import { checkToken } from "../services/API/user.js";
import { getBookmarks } from "../services/API/bookmark.js";

import { signin, signout } from "../store/slices/user.slice";
import { loadBookmarks } from "../store/slices/bookmark.slice";

function HOC({ child, isAuthRequired }) {
    const navigate = useNavigate();
    
    const TOKEN = localStorage.getItem("uat");

    const Child = child;
    const [fetchError, setFetchError] = useState(false);

    const dispatch = useDispatch();
    const { myProfile, myBookmarks, isLogged  } = useSelector((state) => ({
        ...state.user,
        ...state.myBookmarks
    }));

    useEffect(() => {
        async function checkAuth() {

            if (isAuthRequired && !TOKEN) {
                // verifier si existe un cookie
                // si oui insere dans le cookie
                // sinon sortir
                console.log("bloc auth requis sans token")
                dispatch(signout());
                navigate("/home");
            }

            if (!isLogged) {
                console.log("bloc non logged")
                if (isAuthRequired) navigate("/user");
                if (TOKEN !== null) {
                    const response = await checkToken(TOKEN);
                    if (response.status === 200) {
                        dispatch(signin(response.data.userDatas));
                        console.log("relogged")
                        // identify  : redirect to portal
                        navigate("/portal");
                    }
                }
            }
        }
        checkAuth();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!myBookmarks.length && isLogged) {
            async function fetchData() {
                const response = await getBookmarks(TOKEN);
                if (response.code) {
                    setFetchError(true);
                    return;
                }
                dispatch(loadBookmarks(response.data.bookmark_datas));
            }
            fetchData();
        }
        // eslint-disable-next-line
    }, []);

    if (fetchError) {
        return <Error />;
    }

    return (
        <>
            {
                !myBookmarks.length 
                ? <Loading />
                : <Child myBookmarks={myBookmarks} myProfile={myProfile} />
            }
        </>
    );
}

export default HOC;
