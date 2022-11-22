import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../../../helpers/sanitize";
import { resetPasswordUser } from "../../../services/API/user";

// reset password for a user by himself

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
                if (TOKEN && myProfile.uuid && passInfos) {
                    const response = await resetPasswordUser(TOKEN, myProfile.uuid, passInfos);
                    if (response.status !== 200) {
                        setMessage("You can't change your password.");
                    }
                    if (response.data.isModified) {
                        setMessage("The passowrd is modified ! redirect in 2 seconds ...");
                    }
                    setTimeout(() => {
                        navigate("/user/signout");
                    }, "2000");
                }
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

            <section className="reset-pwd">
                <h3>Reset Passaword</h3>
                <form onSubmit={onSubmitHandler}>
                    <input ref={password} type="password" id="password" placeholder="New password ?" onChange={(e) => setPassInfos({ ...passInfos, password: e.target.value })} />

                    <input type="password" id="passwordVerified" placeholder="Repeat new password ?" onChange={(e) => setPassInfos({ ...passInfos, passwordVerified: e.target.value })} />

                    <input type="submit" value="Send" />
                </form>
            </section>

            <div className="divider"></div>

            <section className="btn-manager">
                <Link className="btn" to="/user/profile">
                    Previous
                </Link>
            </section>
        </main>
    );
}

export default ResetForm;
