import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../../../services/API/user";

function ChangeForm({ myProfile }) {
    const TOKEN = localStorage.getItem("uat");
    const alias = useRef();

    const [inputs, setInputs] = useState({
        email: myProfile.email,
        reset_password: myProfile.reset_password,
        alias: myProfile.alias,
        validation_account: myProfile.validation_account,
        avatar: myProfile.avatar,
        role_id: myProfile.role_id,
    });
    const [message, setMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(TOKEN, myProfile.uuid, inputs);
            if (response.data.isModified) {
                setMessage("The alias is modified !");
                // redirect auto avec maj du myProfile
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        alias.current.focus();
    }, []);

    return (
        <main id="reset-pwd">
            <h2>Alias change</h2>
            <form onSubmit={onSubmitHandler}>
                <input ref={alias} type="text" id="alias" placeholder="New alias ?" onChange={(e) => setInputs({ ...inputs, alias: e.target.value })} />

                <input type="submit" value="Send" />
                {message && <p>{message}</p>}
            </form>
            <div className="divider"></div>
            <Link to="/user/profile">Previous</Link>
        </main>
    );
}

export default ChangeForm;
