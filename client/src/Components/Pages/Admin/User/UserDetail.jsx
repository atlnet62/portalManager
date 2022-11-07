import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { selectUser, updateUser } from "../../../../services/API/user";
import { allRole } from "../../../../services/API/role";
import Loading from "../../../UI/Elements/Loading";

function Detail() {
    const { uuid } = useParams();
    const [roles, setRoles] = useState([]);
    const [userInfos, setUserInfos] = useState({ email: "", reset_password: "", alias: "", validation_account: "", avatar: "01.png", role_id: "" });

    const onChangeHandler = async (e) => {
        setUserInfos({ ...userInfos, role_id: parseInt(e) });
    };

    // autosave des changement de parametres
    const setUpdateUser = async () => {
        try {
            if (userInfos.email) {
                //const newInfos = {...userInfos};
                await updateUser(localStorage.getItem("uat"), uuid, {...userInfos});
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const userInfos = await selectUser(localStorage.getItem("uat"), uuid);
                setUserInfos(userInfos.data.userDatas);
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

    setUpdateUser();

    return userInfos.length < 0 ? (
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
                        <td>{userInfos.register_date ? userInfos.register_date : null}</td>
                    </tr>

                    <tr>
                        <td>E-mail</td>
                        <td>{userInfos.email}</td>
                        <td>
                            <Link to="change_mail">Change mail</Link>
                        </td>
                    </tr>

                    <tr>
                        <td>Account type</td>
                        <td>
                            <select id="user_role_id" value={userInfos.role_id} onChange={(e) => onChangeHandler(e.target.value)}>
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
                        {userInfos.reset_password !== 0 ? <td>Must be changed !</td> : <td>OK</td>}
                        <td>
                            <Link to="reset_password">Reset password</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>UUID</td>
                        <td>{userInfos.uuid}</td>
                    </tr>
                </tbody>
            </table>
            <div className="divider"></div>
            <Link to="../user/all">Previous</Link>
        </main>
    );
}

export default Detail;
