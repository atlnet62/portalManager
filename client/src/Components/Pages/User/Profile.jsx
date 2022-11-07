import { useState } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../../../services/API/user";
import Error from "../Error";
import Button from "../../UI/Elements/Button/Index";


function Profile({ myProfile }) {

    // générer le numero de l'avatar
    let pictures = [];
    for (let i = 1; i < 45; i++) {
        let pict = null;
        if (i < 10) {
            pict = `0${i}.png`;
        } else {
            pict =  `${i}.png`;
        }
        pictures.push(pict);
    }
    const [myInfos, setMyInfos] = useState({
        email: myProfile.email,
        reset_password: myProfile.reset_password,
        alias: myProfile.alias,
        validation_account: myProfile.validation_account,
        avatar: myProfile.avatar,
        role_id: myProfile.role_id,
    });

    const [message, setMessage] = useState(null);
    
    const onChangeHandler = (e) => {
        setMyInfos({ ...myInfos, avatar: e });
    };

    // autosave des changement de parametres
    const setUpdateUser = async () => {
        try {
            if (myInfos.email) {
                const newInfos = {...myInfos};
                await updateUser(localStorage.getItem("uat"), myProfile.uuid, newInfos);
                setMessage("Profile updated ! Could you please disconnect and reconnect to updated your infos. Thanks.");

            }
        } catch (error) {
            console.log(error);
        }
    };

    return myProfile === null ? (
        <Error />
    ) : (
        <main id="profile">
            <table>
                <thead>
                    <tr>
                        <th colSpan="3">
                            <h2>Profile</h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Avatar :</td>
                        <td>
                            <img src={`/datas/avatars/${myInfos.avatar}`} alt="this is the avatar" />
                        </td>
                        <td>
                            <select id="user_avatar" value={myInfos.avatar} onChange={(e) => onChangeHandler(e.target.value)}>
                                {pictures.map((picture) => {
                                    return (
                                        <option key={picture}>{picture}</option>
                                    );
                                })}
                            </select>
                            <Button onClickHandler={() => setUpdateUser()} isDisabled={myInfos.avatar === myProfile.avatar ? true : false}>Save</Button>
                        </td>
                    </tr>

                    <tr>
                        <td>Alias :</td>
                        <td>{myProfile.alias ? myProfile.alias : null}</td>
                        <td>
                            <Link to="change_alias">Change alias</Link>
                        </td>
                    </tr>

                    <tr>
                        <td>Account Validated :</td>
                        <td>{myProfile.validation_account && myProfile.validation_account === 1 ? "Yes" : "No"}</td>
                    </tr>

                    <tr>
                        <td>Registered date :</td>
                        <td>{myProfile.register_date ? myProfile.register_date : null}</td>
                    </tr>

                    <tr>
                        <td>E-mail</td>
                        <td>{myProfile.email}</td>
                    </tr>

                    <tr>
                        <td>Account type</td>
                        <td>{myProfile.user_role}</td>
                    </tr>

                    <tr>
                        <td>Password</td>
                        {myProfile.reset_password !== 0 ? <td>Must be changed !</td> : <td>OK</td>}
                        <td>
                            <Link to="reset_password">Reset password</Link>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">
                            {message && <p>{message}</p>}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </main>
    );
}

export default Profile;
