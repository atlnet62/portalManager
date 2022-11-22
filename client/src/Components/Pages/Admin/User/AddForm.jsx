import React, { useEffect, useState, useRef } from "react";
import { validate } from "../../../../helpers/sanitize";
import { addUser } from "../../../../services/API/user";

// components add user by admin

function AddUserForm() {
    const TOKEN = localStorage.getItem("uat");

    const email = useRef();

    const [userInfos, setUserInfos] = useState({ email: "" });
    const [message, setMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const userInfosValidation = validate("user-add", userInfos);
        if (userInfosValidation === true) {
            try {
                if (TOKEN) {
                    const response = await addUser(TOKEN, userInfos);

                    if (response.status !== 200) {
                        if (response.status === 409) {
                            setMessage(response.data.errorMessage);
                        } else {
                            setMessage("Problem to add the user, Please contact your admin.");
                        }
                    }
                    if (response.data.isCreated) {
                        setMessage(`Temporary Password :${response.data.tempPassword}`);
                    }
                }
                email.current.value = "";
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        } else {
            setMessage(userInfosValidation);
        }
    };

    useEffect(() => {
        email.current.focus();
    }, []);

    return (
        <>
            {message && (
                <section className="popup">
                    <p>{message}</p>
                </section>
            )}

            <section className="add-user">
                <h3>Add User Form</h3>
                <form onSubmit={onSubmitHandler}>
                    <input ref={email} type="email" placeholder="E-mail ?" onChange={(e) => setUserInfos({ ...userInfos, email: e.target.value })} />
                    <input type="submit" value="Send" />
                </form>
            </section>
        </>
    );
}

export default AddUserForm;
