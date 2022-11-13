import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../../../helpers/sanitize";
import { resetPasswordUser } from "../../../services/API/user";

function ResetForm({ myProfile }) {
    const TOKEN = localStorage.getItem("uat");

    const password = useRef();
    const navigate = useNavigate();

    const [passInfos, setPassInfos] = useState({ password: "", passwordVerified: "" });
    const [message, setMessage] = useState(null);


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const passInfosValidation = validate("reset-password", passInfos);
        if (passInfosValidation === true) {
            try {
                const response = await resetPasswordUser(TOKEN, myProfile.uuid, passInfos);
                if (response.data.isModified) {
                    setMessage("The passowrd is modified ! redirect in 5 seconds ...");
                }
                setTimeout(() => {
                    navigate("/user/signout");
                }, "5000");
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        } else {
            setMessage(passInfosValidation);
        }
    };

    useEffect(() => {
        password.current.focus();
    }, []);

    return (
        <main id="reset-pwd">
            {message && (
                <section className="popup">
                    <p>{message}</p>
                </section>
            )}

            <section>
                <h2>Reset Passaword</h2>
                <form onSubmit={onSubmitHandler}>
                    <input ref={password} type="password" id="password" placeholder="New password ?" onChange={(e) => setPassInfos({ ...passInfos, password: e.target.value })} />
                    <input type="password" id="passwordVerified" placeholder="Repeat new password ?" onChange={(e) => setPassInfos({ ...passInfos, passwordVerified: e.target.value })} />
                    <input type="submit" value="Send" />
                </form>
            </section>

            <div className="divider"></div>

            <Link to="/user/profile">Previous</Link>
        </main>
    );
}

export default ResetForm;
