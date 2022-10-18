import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { selectUser } from "../../../../services/API/user";
import Loading from "../../../UI/Elements/Loading";

function Detail() {
    const { uuid } = useParams();
    const [user, setUser] = useState({ user_id: 0, uuid: "", email: "", reset_password: 0, alias: null, validation_account: 0, register_date: "", avatar: "default.png", role_id: 0, user_role: 0 });

    useEffect(() => {
        const TOKEN = localStorage.getItem("uat");
        const getUser = async () => {
            const user = await selectUser(TOKEN, uuid);
            setUser(user.data.userDatas);
        };
        getUser();
        // eslint-disable-next-line
    }, []);

    return user.length < 0 ? (
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
                            <img src={user.avatar !== "default.png" ? `/datas/${user.uuid}/${user.avatar}` : `/datas/default/${user.avatar}`} alt="this is the avatar" />
                        </td>
                        <td>
                            <button>Change</button>
                        </td>
                    </tr>

                    <tr>
                        <td>Alias :</td>
                        <td>{user.alias ? user.alias : null}</td>
                        <td>
                            <button>Change</button>
                        </td>
                    </tr>

                    <tr>
                        <td>Account Validated :</td>
                        <td>{user.validation_account && user.validation_account === 1 ? "Yes" : "No"}</td>
                    </tr>

                    <tr>
                        <td>Registered date :</td>
                        <td>{user.register_date ? user.register_date : null}</td>
                    </tr>

                    <tr>
                        <td>E-mail</td>
                        <td>{user.email}</td>
                        <td>
                            <button>Change</button>
                        </td>
                    </tr>

                    <tr>
                        <td>Account type</td>
                        <td>{user.user_role}</td>
                        <td>
                            <button>Change</button>
                        </td>
                    </tr>

                    <tr>
                        <td>Password</td>
                        {user.reset_password !== 0 ? <td>Must be changed !</td> : <td>***</td>}
                        <td>
                            <button>Change</button>
                        </td>
                    </tr>
                    <tr>
                        <td>UUID</td>
                        <td>{user.uuid}</td>
                    </tr>
                </tbody>
            </table>
            <Link to="../user/all">Previous</Link>
        </main>
    );
}

export default Detail;
