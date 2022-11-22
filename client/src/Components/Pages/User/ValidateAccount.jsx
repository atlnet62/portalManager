import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateAccount } from "../../../services/API/user";
import Button from "../../UI/Elements/Button/Index";

// validation account page in link with google api to send an email confirmation

function ValidateAccount() {
    const { uuid } = useParams();

    const navigate = useNavigate();
    const [message, setMessage] = useState(null);

    const validateAccountHandler = async (e) => {
        e.preventDefault();
        const datas = {
            uuid: uuid,
        };
        try {
            if(datas) {
                const response = await validateAccount(datas);
                if (response.status !== 200) {
                    setMessage("We have some connection problems with the database.");
                }                
                if (response.status === 200) {
                    setMessage(`${response.data.message}, redirect automatically in 3 secondes...`);
                    setTimeout(() => {
                        navigate("/user");
                    }, 3000);
                }
            }
        } catch (error) {
            
        }
    };

    return (
        <main id="account-validator">
            {message && (
                <section className="popup">
                    <p>{message}</p>
                </section>
            )}

            {message === null && (
                <section className="validator">
                    <p>Click on the button to validate the account.</p>

                    <Button className="btn" onClickHandler={(e) => validateAccountHandler(e)}>Valider votre compte</Button>
                </section>
            )}
        </main>
    );
}

export default ValidateAccount;
