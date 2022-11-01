import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { resetPasswordUser } from "../../../../services/API/user";

function ResetForm() {
    const TOKEN = localStorage.getItem("uat");
    const { uuid } = useParams();

    const [inputs, setInputs] = useState({ password: "", passwordVerified: "" });
    const password = useRef();

    const [message, setMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (inputs.password !== inputs.passwordVerified) {
            setMessage("The 2 passwords are différent ! please could you re-type the same password inside both field.");
        }
        if (inputs.password === inputs.passwordVerified) {
            const response = await resetPasswordUser(TOKEN, uuid, inputs);
            if (response.data.isModified) {
                setMessage("The password is modified !");
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
                <input ref={password} type="password" placeholder="New password ?" onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                <input type="password" placeholder="Repeat new password ?" onChange={(e) => setInputs({ ...inputs, passwordVerified: e.target.value })} />
                <input type="submit" value="Send" />
            </form>
            {message && <p>{message}</p>}
            <div className="divider"></div>
            <Link to="../user/all">Previous</Link>
        </main>
    );
}

export default ResetForm;
