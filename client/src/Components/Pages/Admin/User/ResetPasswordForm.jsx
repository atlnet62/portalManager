import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { validate } from "../../../../helpers/sanitize";
import { resetPasswordUser } from "../../../../services/API/user";

function ResetForm() {
    const TOKEN = localStorage.getItem("uat");
    const { uuid } = useParams();
    const password = useRef();

    const [passInfos, setPassInfos] = useState({ password: "", passwordVerified: "" });
    const [message, setMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const passInfosValidation = validate("reset-password", passInfos);
        if (passInfosValidation === true) {
            try {
                const response = await resetPasswordUser(TOKEN, uuid, passInfos);
                if (response.data.isModified) {
                    setMessage("The password is modified !");
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

            <section>
                <h3>Reset Passaword</h3>
                <form onSubmit={onSubmitHandler}>
                    <input ref={password} type="password" placeholder="New password ?" onChange={(e) => setPassInfos({ ...passInfos, password: e.target.value })} />
                    <input type="password" placeholder="Repeat new password ?" onChange={(e) => setPassInfos({ ...passInfos, passwordVerified: e.target.value })} />
                    <input type="submit" value="Send" />
                </form>
            </section>

            <div className="divider"></div>

            <Link to="..">Previous</Link>
        </main>
    );
}

export default ResetForm;
