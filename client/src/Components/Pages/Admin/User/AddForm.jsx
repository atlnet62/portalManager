import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { addUser } from "../../../../services/API/user";

function Addform() {
    const TOKEN = localStorage.getItem("uat");

    const [inputs, setInputs] = useState({email:""});
    const email = useRef();

    const [message, setMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await addUser(TOKEN, inputs);
            if(response.status) {
                setMessage(response.data.errorMessage);
            }
            if(response.status === 200) {
                setMessage(`Temporary Password :${response.data.tempPassword}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        email.current.focus();
    }, []);
    
    return (
        <main id="add-user">
            <h2>Add User Form</h2>
            <form onSubmit={onSubmitHandler}>
                <input 
                    ref={email}
                    type="text" 
                    placeholder="E-mail ?"
                    onChange={(e) => setInputs({...inputs, email: e.target.value})}
                />
                <input type="submit" value="Send" />
                {message && <p>{message}</p>}
            </form>
            <div className="divider"></div>
            <Link to="../user/all">Previous</Link>
        </main>
    );
}

export default Addform;
