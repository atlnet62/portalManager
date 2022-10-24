import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { selectUser, updateUser } from "../../../../services/API/user";
import { allRole } from "../../../../services/API/role";
import Loading from "../../../UI/Elements/Loading";
import Button from "./.././../../UI/Elements/Button/Index";

function Detail() {
    //const TOKEN = localStorage.getItem("uat");
    const { uuid } = useParams();

    const [roles, setRoles] = useState([]);

    const [infoUser, setInfoUser] = useState({});

    const onChangeHandler = async (e) => {
        setInfoUser({ ...infoUser, role_id: parseInt(e) });
    };

    // autosave des changement de parametres
    const setNewUser = async () => {
        try {
            if (infoUser.email) {
                console.log(infoUser);
                const newInfo = {
                    email: infoUser.email,
                    reset_password: infoUser.reset_password,
                    alias: infoUser.alias,
                    validation_account: infoUser.validation_account,
                    avatar: infoUser.avatar,
                    role_id: infoUser.role_id,
                };
                await updateUser(localStorage.getItem("uat"), uuid, newInfo);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const infoUser = await selectUser(localStorage.getItem("uat"), uuid);
                setInfoUser(infoUser.data.userDatas);
            } catch (error) {
                console.log(error);
            }
        };

        const getRoles = async () => {
            const roles = await allRole(localStorage.getItem("uat"));
            setRoles(roles.data.role_datas);
        };

        getRoles();
        getUser();
        // eslint-disable-next-line
    }, []);

    setNewUser();

    return infoUser.length < 0 ? (
        <Loading />
    ) : (
        <main id="user-detail">
            <table>
                <thead>
                    <tr>
                        <th colSpan="3">
                            <h2>Detail</h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Avatar :</td>
                        <td>
                            <img src={infoUser.avatar !== "default.png" ? `/datas/${infoUser.uuid}/${infoUser.avatar}` : `/datas/default/${infoUser.avatar}`} alt="this is the avatar" />
                        </td>
                        <td>
                            <Button
                                onClickHandler={() => {
                                    console.log("Click change avatar");
                                }}>
                                Change avatar
                            </Button>
                        </td>
                    </tr>

                    <tr>
                        <td>Alias :</td>
                        <td>{infoUser.alias ? infoUser.alias : null}</td>
                        <td>
                            <Button
                                onClickHandler={() => {
                                    console.log("Change alias");
                                }}>
                                Change alias
                            </Button>
                        </td>
                    </tr>

                    <tr>
                        <td>Account Validated :</td>
                        <td>{infoUser.validation_account && infoUser.validation_account === 1 ? "Yes" : "No"}</td>
                    </tr>

                    <tr>
                        <td>Registered date :</td>
                        <td>{infoUser.register_date ? infoUser.register_date : null}</td>
                    </tr>

                    <tr>
                        <td>E-mail</td>
                        <td>{infoUser.email}</td>
                        <td>
                            <Button
                                onClickHandler={() => {
                                    console.log("Change Email");
                                }}>
                                Change e-mail
                            </Button>
                        </td>
                    </tr>

                    <tr>
                        <td>Account type</td>
                        <td>
                            <select id="user_role_id" value={infoUser.role_id} onChange={(e) => onChangeHandler(e.target.value)}>
                                {roles.map((role) => {
                                    return (
                                        <option key={role.roleID} value={role.roleID}>
                                            {role.title}
                                        </option>
                                    );
                                })}
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Password</td>
                        {infoUser.reset_password !== 0 ? <td>Must be changed !</td> : <td>OK</td>}
                        <td>
                            <Button
                                onClickHandler={() => {
                                    console.log("Click reset");
                                }}>
                                Reset Password
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>UUID</td>
                        <td>{infoUser.uuid}</td>
                    </tr>
                </tbody>
            </table>
            <div className="divider"></div>
            <Link to="../user/all">Previous</Link>
        </main>
    );
}

export default Detail;
