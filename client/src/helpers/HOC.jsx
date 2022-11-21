import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Error from "../Components/Pages/Error";
import { checkToken } from "../services/API/user.js";
import { getBookmarks } from "../services/API/bookmark.js";
import { signin, signout } from "../store/slices/user.slice";
import { loadBookmarks } from "../store/slices/bookmark.slice";

function HOC({ child, isAuthRequired }) {
    const TOKEN = localStorage.getItem("uat");
    
    const navigate = useNavigate();

    const Child = child;
    const [fetchError, setFetchError] = useState(false);
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const { myProfile, myBookmarks, isLogged } = useSelector((state) => ({
        ...state.user,
        ...state.myBookmarks,
    }));

    useEffect(() => {
        async function checkAuth() {
            if (isAuthRequired && !TOKEN) {
                dispatch(signout());
                navigate("/home");
            }

            if (!isLogged) {
                if (isAuthRequired) {
                    navigate("/user");
                };

                if (TOKEN !== null) {
                    try {
                        const response = await checkToken(TOKEN);
                        if (response.status !== 200) {
                            localStorage.removeItem("uat");
                            navigate("/user");
                        }
                        if (response.status === 200) {
                            dispatch(signin(response.data.userDatas));
                            navigate("/main");
                        }
                    } catch (error) {
                        setMessage("We have connection problems with the database.");
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
                if (TOKEN) {
                    const response = await getBookmarks(TOKEN);
                    if (response.status !== 200) {
                        setFetchError(true);
                        if(response.data.isNotUser === "Yes") {
                            setMessage("Please could you create or validate an account. thanks");
                        } else {
                            setMessage("We have connection problems with the database.");
                        }
                        return;
                    }
                    if (response.status === 200) {
                        dispatch(loadBookmarks(response.data.bookmarkDatas));
                    }
                }
            }
            fetchData();
        }
        // eslint-disable-next-line
    }, []);

    if (fetchError || message) {
        return <Error message={message}/>;
    }

    return (<Child myBookmarks={myBookmarks} myProfile={myProfile} />);
}

export default HOC;
