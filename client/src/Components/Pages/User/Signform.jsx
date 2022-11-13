import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../../../helpers/sanitize";
import { signup, signin } from "../../../services/API/user.js";
import logo from "./../../../assets/images/logo.svg";
import { Link } from "react-router-dom";

function Signform({ formType }) {
    const navigate = useNavigate();
    const email = useRef();

    const [userInfos, setUserInfos] = useState({ email: "", password: "" });
    const [message, setMessage] = useState(null);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (formType === "signin") {
            handleSignin();
        }
        if (formType === "signup") {
            handleSignup();
        }
        setUserInfos({ email: "", password: "" });
    };

    const handleSignin = async () => {
        const userInfosValidation = validate("signin", userInfos);
        if (userInfosValidation === true) {
                try {
                    const response = await signin(userInfos);
                    if(response.status !== 200) {
                        if (response.status === 404) {
                            setMessage(response.data.message);
                            return;
                        } else {
                            setMessage("Problem to add the user, Please contact your admin.");
                        }
                    }
                    localStorage.setItem("uat", response.data.token);
                } catch (error) {
                    setMessage("We have some connection problems with the database.");
                }
                navigate("/main");
            } else {
                setMessage(userInfosValidation);
            }
    };

    const handleSignup = async () => {
        const userInfosValidation = validate("signup", userInfos);
        if (userInfosValidation === true) {
            const response = await signup(userInfos);
            if(response.status !== 200) {
                if (response.status === 409) {
                    setMessage(response.data.errorMessage);
                    return;
                } else {
                    setMessage("Problem to add the user, Please contact your admin.");
                }
            } else {
                navigate("/user");
            }
        } else {
            setMessage(userInfosValidation);
        }
    };

    useEffect(() => {
        email.current.focus();
    }, []);

    return (
        <main id="entry">

            <section id="form-entry">
                <img src={logo} alt="logo" />
                <form onSubmit={onSubmitHandler}>
                    <fieldset>
                        <legend>
                            {formType === "signin" ? "signin" : "signup"}
                        </legend>

                        <input
                            ref={email}
                            type="email"
                            placeholder="E-mail ?"
                            value={userInfos.email}
                            onChange={(e) =>
                                setUserInfos({ ...userInfos, email: e.target.value })
                            }
                        />

                        <input
                            type="password"
                            placeholder="Password ?"
                            value={userInfos.password}
                            onChange={(e) =>
                                setUserInfos({
                                    ...userInfos,
                                    password: e.target.value,
                                })
                            }
                        />

                        {message && <p className="popup-log">{message}</p>}

                        <input type="submit" value="Send" />
                    </fieldset>
                </form>
                {formType === "signin" ? (
                    <p>
                        Are you register ? No ... <Link to={"/user/signup"}>here</Link>
                    </p>
                ) : null}
            </section>
        </main>
    );
}

export default Signform;