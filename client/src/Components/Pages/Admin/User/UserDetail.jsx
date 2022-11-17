import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../../UI/Elements/Button/Index";
import { selectUser, updateUser } from "../../../../services/API/user";
import { allRole } from "../../../../services/API/role";
import { faCheck, faFloppyDisk, faPen, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validate } from "../../../../helpers/sanitize";

function Detail() {
    const TOKEN = localStorage.getItem("uat");
    const { uuid } = useParams();
    const [roles, setRoles] = useState([]);

    const [userInfos, setUserInfos] = useState({ email: "", reset_password: "", alias: "", validation_account: "", avatar: "01.png", role_id: "" });
    const [message, setMessage] = useState(null);
    const [edit, setEdit] = useState(false);

    const ChangeRole = async (e, datas) => {
        e.preventDefault();
        setUserInfos({ ...userInfos, role_id: parseInt(datas) });
    };

    // autosave des changement de parametres
    const setUpdateRole = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            if (userInfos.email) {
                const response = await updateUser(localStorage.getItem("uat"), uuid, { ...userInfos });
                if (response.data.isModified) {
                    setMessage("The role is updated.");
                }
            }
        } catch (error) {
            setMessage("We have some connection problems with the database.");
        }
    };

    const setUpdateEmail = async (e) => {
        e.preventDefault();
        setMessage("");
        if (edit === true) {
            const userInfosValidation = validate("user-update", userInfos);
            if (userInfosValidation === true) {
                try {
                    const response = await updateUser(TOKEN, uuid, userInfos);
                    if (response.data.isModified) {
                        setMessage("The email user's is modified !");
                    }
                } catch (error) {
                    setMessage("We have some connection problems with the database.");
                }
            } else {
                setMessage(userInfosValidation);
            }
        }
        setEdit(!edit);
    };

    useEffect(() => {
        const getRoles = async () => {
            const roles = await allRole(localStorage.getItem("uat"));
            setRoles(roles.data.role_datas);
        };
        getRoles();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const getUser = async () => {
            try {
                const userInfos = await selectUser(localStorage.getItem("uat"), uuid);
                setUserInfos(userInfos.data.userDatas);
                
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        };
        getUser();
        // eslint-disable-next-line
    }, []);
    
    return (
        <main id="user-detail">
            {message && (
                <section className="popup">
                    <p>{message}</p>
                </section>
            )}

            <section>
                <h3>User detail</h3>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Avatar :</td>
                            <td>
                                <img src={`/datas/avatars/${userInfos.avatar}`} alt="this is the avatar" />
                            </td>
                        </tr>

                        <tr>
                            <td>Alias :</td>
                            <td>{userInfos.alias ? userInfos.alias : null}</td>
                        </tr>

                        <tr>
                            <td>Account Validated :</td>
                            <td>{userInfos.validation_account && userInfos.validation_account === 1 ? "Yes" : "No"}</td>
                        </tr>

                        <tr>
                            <td>Registered date :</td>

                            <td>{userInfos.register_date ? (new Date(userInfos.register_date).toLocaleDateString()) : null}</td>
                        </tr>

                        <tr>
                            <td>E-mail</td>
                            <td>{edit ? <input type="email" value={userInfos.email} onChange={(e) => setUserInfos({ ...userInfos, email: e.target.value })} /> : userInfos.email}</td>
                            <td>
                                <Button className={!edit ? "btn-edit" : "btn-valid"} onClickHandler={(e) => setUpdateEmail(e)}>
                                    {edit ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPen} />}
                                </Button>
                            </td>
                        </tr>

                        <tr>
                            <td>Account type</td>
                            <td>
                                <select id="user_role_id" value={userInfos.role_id} onChange={(e) => ChangeRole(e, e.target.value)}>
                                    {roles.map((role) => {
                                        return (
                                            <option key={role.roleID} value={role.roleID}>
                                                {role.title}
                                            </option>
                                        );
                                    })}
                                </select>
                            </td>
                            <td>
                                <Button className="btn-edit" onClickHandler={(e) => setUpdateRole(e)}>
                                    <FontAwesomeIcon icon={faFloppyDisk} />
                                </Button>
                            </td>
                        </tr>

                        <tr>
                            <td>UUID</td>
                            <td>{userInfos.uuid}</td>
                        </tr>

                        <tr>
                            <td>Password</td>
                            {userInfos.reset_password !== 0 ? <td>Must be changed !</td> : <td>OK</td>}
                            <td>
                                <Link className="btn-link" to="reset_password">
                                    <FontAwesomeIcon icon={faArrowsRotate} />
                                </Link>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </section>

            <div className="divider"></div>
            
            <section className="btn-manager">
                <Link className="btn" to="..">
                    Previous
                </Link>
            </section>
        </main>
    );
}

export default Detail;
