import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../../../helpers/sanitize";
import { signup, signin } from "../../../services/API/user.js";
import logo from "./../../../assets/images/logo.svg";
import { Link } from "react-router-dom";

function Signform({ formType }) {
    const navigate = useNavigate();
    const email = useRef();

    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState(null);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (formType === "signin") {
            handleSignin();
        }
        if (formType === "signup") {
            handleSignup();
        }
        setInputs({ email: "", password: "" });
    };

    const handleSignin = async () => {
        const response = await signin(validate("signin", inputs));
        if (response.status === 404) {
            setMsg(response.data.msg);
            return;
        }
        localStorage.setItem("uat", response.data.token);
        
        navigate("/main");
    };

    const handleSignup = async () => {
        const inputsValidation = validate("signup", inputs);
        if (inputsValidation === true) {
            const response = await signup(inputs);
            if (response.status === 409) {
                setMsg(response.data.msg);
                return;
            } else {
                navigate("/user");
            }
        } else {
            setMsg(inputsValidation);
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
                            type="text"
                            placeholder="E-mail ?"
                            value={inputs.email}
                            onChange={(e) =>
                                setInputs({ ...inputs, email: e.target.value })
                            }
                        />

                        <input
                            type="password"
                            placeholder="Password ?"
                            value={inputs.password}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                })
                            }
                        />

                        {msg && <p>{msg}</p>}

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