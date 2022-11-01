import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { selectUser, updateUser } from "../../../../services/API/user";

function ChangeMailForm() {
    const TOKEN = localStorage.getItem("uat");
    const { uuid } = useParams();
    const email = useRef();

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(TOKEN, uuid, inputs);
            if (response.data.isModified) {
                setMessage("The email is modified !");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const userInfos = await selectUser(localStorage.getItem("uat"), uuid);
                setInputs({
                    ...userInfos.data.userDatas.email,
                    reset_password: userInfos.data.userDatas.reset_password,
                    alias: userInfos.data.userDatas.alias,
                    validation_account: userInfos.data.userDatas.validation_account,
                    avatar: userInfos.data.userDatas.avatar,
                    role_id: userInfos.data.userDatas.role_id,
                });
            } catch (error) {
                console.log(error);
            }
        };

        getUser();
        email.current.focus();
        // eslint-disable-next-line
    }, []);

    return (
        <main id="change-mail-form">
            <h2>Change mail form</h2>
            <form onSubmit={onSubmitHandler}>
                <label>Replace by new mail : </label>
                <input ref={email} type="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                <input type="submit" value="Send" />
            </form>
            {message && <p>{message}</p>}
            <div className="divider"></div>
            <Link to="../user/all">Previous</Link>
        </main>
    );
}

export default ChangeMailForm;
