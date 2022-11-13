import { Fragment, useEffect, useState } from "react";
import Loading from "../../../UI/Elements/Loading";
import { allUser, removeUser } from "../../../../services/API/user";
import { Link } from "react-router-dom";
import Button from "../../../UI/Elements/Button/Index";
import { faXmark, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserList() {
    const TOKEN = localStorage.getItem("uat");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);
    const [nbUsers, setNbUsers] = useState(0);

    let count = -1;

    const clickRemove = async (e, uuid) => {
        e.preventDefault();
        try {
            const response = await removeUser(TOKEN, uuid);
            if (response.data.isRemoved) {
                setMessage("User Deleted !");
            }
            const indexUser = users.map((user) => user.uuid);
            const newListUsers = users;
            newListUsers.splice(indexUser.indexOf(uuid), 1);
            setUsers(newListUsers);
        } catch (error) {
            setMessage("We have some connection problems with the database.");
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                const users = await allUser(localStorage.getItem("uat"));
                setUsers(users.data.usersDatas);
                setNbUsers(users.data.nbUsers);
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        };
        getUsers();
    }, []);

    return (
        <main id="user-list">

            { message &&
            <section className="popup">
                <p>{message}</p>
            </section>}

            <section>
                <h3>User list by email</h3>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>email</th>
                            <th>Alias</th>
                            <th>Role</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length < 0 ? (
                            <Loading />
                        ) : (
                            users.map((user) => {
                                count++;
                                return (
                                    <Fragment key={count}>
                                        <tr>
                                            <td>{count}</td>
                                            <td>{user.email}</td>
                                            <td>{user.alias}</td>
                                            <td>{user.user_role}</td>
                                            <td>
                                                <Link className="btn-link" to={`user/detail/${user.uuid}`}>
                                                    <FontAwesomeIcon icon={faIdCard} />
                                                </Link>
                                            </td>
                                            <td>
                                                <Button className="btn-del" onClickHandler={(e) => clickRemove(e, user.uuid)}><FontAwesomeIcon icon={faXmark} /></Button>
                                            </td>
                                        </tr>
                                    </Fragment>
                                );
                            })
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="6">Pagination</td>
                        </tr>
                        <tr>
                            <td colSpan="6">Total {nbUsers} users</td>
                        </tr>
                    </tfoot>
                </table>
            </section>

        </main>
    );
}

export default UserList;
