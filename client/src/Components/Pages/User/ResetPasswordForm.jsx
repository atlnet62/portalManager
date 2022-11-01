import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { resetPasswordUser } from "../../../services/API/user";

function ResetForm({ myProfile }) {
    const TOKEN = localStorage.getItem("uat");
    const password = useRef();

    const [inputs, setInputs] = useState({ password: "", passwordVerified: "" });
    const [message, setMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (inputs.password !== inputs.passwordVerified) {
            setMessage("The 2 passwords are différent ! please could you re-type the same password inside both field.");
        }
        if (inputs.password === inputs.passwordVerified) {
            const response = await resetPasswordUser(TOKEN, myProfile.uuid, inputs);
            if (response.data.isModified) {
                setMessage("The passowrd is modified !");
            }
        }
    };

    useEffect(() => {
        password.current.focus();
    }, []);

    return (
        <main id="reset-pwd">
            <h2>Reset Passaword</h2>
            <form onSubmit={onSubmitHandler}>
                <input ref={password} type="password" id="password" placeholder="New password ?" onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                <input type="password" id="passwordVerified" placeholder="Repeat new password ?" onChange={(e) => setInputs({ ...inputs, passwordVerified: e.target.value })} />
                <input type="submit" value="Send" />
                {message && <p>{message}</p>}
            </form>
            <div className="divider"></div>
            <Link to="/user/profile">Previous</Link>
        </main>
    );
}

export default ResetForm;
