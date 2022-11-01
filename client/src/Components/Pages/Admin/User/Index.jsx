import React, { Fragment, useEffect, useState } from "react";
import Loading from "../../../../Components/UI/Elements/Loading";
import { allUser, removeUser } from "../../../../services/API/user";
import { Link } from "react-router-dom";
import Button from "../../../UI/Elements/Button/Index";

function UserTable() {
    const TOKEN = localStorage.getItem("uat");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);
    const [nbUsers, setNbUsers] = useState(0);

    const clickRemove = async (e, uuid) => {
        e.preventDefault();
        try {
            // supprimer avant les données dans category, bookmark avant de supprimer le user
            const response = await removeUser(TOKEN, uuid);
            if (response.data.isRemoved) {
                setMessage("User Deleted !");
            }
            const users = await allUser(TOKEN);
            setUsers(users.data.usersDatas);
            setNbUsers(users.data.nbUsers);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                const users = await allUser(localStorage.getItem("uat"));
                setUsers(users.data.usersDatas);
                setNbUsers(users.data.nbUsers);
            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
    }, []);

    return (
        <main id="user-list">
            <section id="admin-bar">
                <Link to={`./../add`}>Add User</Link>
            </section>
            <div className="divider"></div>
            <section>
                <h2>User list by email</h2>
                <p>Total {nbUsers} users</p>
                <table className="user-list">
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
                                return (
                                    <Fragment key={user.user_id}>
                                        <tr>
                                            <td>{user.user_id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.alias}</td>
                                            <td>{user.user_role}</td>
                                            <td>
                                                <Link to={`./../detail/${user.uuid}`}>DETAIL</Link>
                                            </td>
                                            <td>
                                                <Button onClickHandler={(e) => clickRemove(e, user.uuid)}>SUPPRIMER</Button>
                                            </td>
                                        </tr>
                                    </Fragment>
                                );
                            })
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5">{message}</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="divider"></div>
                <Link to="../../admin">Previous</Link>
            </section>
        </main>
    );
}

export default UserTable;
