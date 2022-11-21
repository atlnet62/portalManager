import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../../../services/API/user";
import Error from "../Error";
import Button from "../../UI/Elements/Button/Index";
import { faFloppyDisk, faCheck, faPen, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validate } from "../../../helpers/sanitize";

function Profile({ myProfile }) {
    const TOKEN = localStorage.getItem("uat");
    // générer le numero de l'avatar => photos fixe
    let pictures = [];
    for (let i = 0; i < 45; i++) {
        let pict = null;
        if (i < 10) {
            pict = `0${i}.png`;
        } else {
            pict = `${i}.png`;
        }
        pictures.push(pict);
    }

    const navigate = useNavigate();

    const [myInfos, setMyInfos] = useState({ email: "", reset_password: 0, alias: "", validation_account: 0, avatar: "00.png", role_id: 0});
    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState(null);

    const onChangeAvatar = async (e, avatar) => {
        e.preventDefault();
        setMyInfos({ ...myInfos, avatar: avatar });
    };

    const ChangeAlias = async (e) => {
        e.preventDefault();
        setMessage("");
        if (edit === true) {
            const myInfosValidation = validate("alias", myInfos);
            if (myInfosValidation === true) {
                try {
                    if (myProfile.uuid && TOKEN) {
                        const newInfos = { ...myInfos };
                        const response = await updateUser(TOKEN, myProfile.uuid, newInfos);
                        if (response.status !== 200) {
                            setMessage("You can update your profile.");
                        }
                        if (response.status === 200) {
                            setMessage("Profile updated ! redirect in 2 seconds ...");
                            setTimeout(() => {
                                navigate("/user/signout");
                            }, "2000");
                        }
                    }
                } catch (error) {
                    setMessage("We have connection problems with the database.");
                }
            } else {
                setMessage(myInfosValidation);
            }
        }
        setEdit(!edit);
    };

    const setUpdateUser = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            if (myProfile.uuid && TOKEN) {
                const newInfos = { ...myInfos };
                const response = await updateUser(TOKEN, myProfile.uuid, newInfos);
                if (response.status !== 200) {
                    setMessage("You can update your profile.");
                }
                if (response.status === 200) {
                    setMessage("Profile updated ! redirect in 2 seconds ...");
                    setTimeout(() => {
                        navigate("/user/signout");
                    }, "2000");
                }
            }
        } catch (error) {
            setMessage("We have connection problems with the database.");
        }
    };

    useEffect(() => {
        const chargeMyInfos = () => {
            if (myProfile) {
                setMyInfos({
                    email: myProfile.email,
                    reset_password: myProfile.reset_password,
                    alias: myProfile.alias,
                    validation_account: myProfile.validation_account,
                    avatar: myProfile.avatar,
                    role_id: myProfile.role_id,
                });
            }
        };
        chargeMyInfos();
        // eslint-disable-next-line
    }, []);

    return myInfos && myProfile ? (
        <main id="profile">
            {message && (
                <section className="popup">
                    <p>{message}</p>
                </section>
            )}

            <section className="profile">
                <h3>Profile</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Avatar :</td>
                            <td>
                                <img src={`/datas/avatars/${myInfos.avatar}`} alt="this is the avatar" />
                            </td>
                            <td>
                                <select id="user_avatar" value={myInfos.avatar} onChange={(e) => onChangeAvatar(e, e.target.value)}>
                                    {pictures.map((picture) => {
                                        return <option key={picture}>{picture}</option>;
                                    })}
                                </select>
                                <Button className="btn-valid" onClickHandler={(e) => setUpdateUser(e)} isDisabled={myInfos.avatar === myProfile.avatar ? true : false}>
                                    <FontAwesomeIcon icon={faFloppyDisk} />
                                </Button>
                            </td>
                        </tr>

                        <tr>
                            <td>Alias :</td>
                            <td>{!edit ? myInfos.alias : <input type="text" value={!myInfos.alias ? "new Comer" : myInfos.alias} onChange={(e) => setMyInfos({ ...myInfos, alias: e.target.value })} />}</td>
                            <td>
                                <Button className={!edit ? "btn-edit" : "btn-valid"} onClickHandler={(e) => ChangeAlias(e)}>
                                    {edit ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPen} />}
                                </Button>
                                {/* <Link to="change_alias">Change alias</Link> */}
                            </td>
                        </tr>

                        <tr>
                            <td>Account Validated :</td>
                            <td>{myProfile.validation_account && myProfile.validation_account === 1 ? "Yes" : "No"}</td>
                        </tr>

                        <tr>
                            <td>Registered date :</td>
                            <td>{myProfile.register_date ? new Date(myProfile.register_date).toLocaleDateString() : null}</td>
                        </tr>

                        <tr>
                            <td>E-mail :</td>
                            <td>{myProfile.email}</td>
                        </tr>

                        <tr>
                            <td>Account type :</td>
                            <td>{myProfile.user_role}</td>
                        </tr>

                        <tr>
                            <td>Password :</td>
                            {myProfile.reset_password !== 0 ? <td>Must be changed !</td> : <td>OK</td>}
                            <td>
                                <Link className="btn-link" to="reset_password">
                                    <FontAwesomeIcon icon={faArrowsRotate} />
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    ) : (
        <Error message={"It's not possible to charge your profile"} />
    );
}

export default Profile;
