import React, { useEffect, useState } from "react";
import Loading from "../../../../Components/UI/Elements/Loading";
import { allUser, removeUser } from "../../../../services/API/user";
import { Link } from "react-router-dom";
import Button from "../../../UI/Elements/Button/Index";


function UserTable() {
    const TOKEN = localStorage.getItem("uat");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);

    const clickRemove = async (e, uuid) => {
        e.preventDefault();
        try {
            //console.log(uuid, '//', TOKEN);
            const response = await removeUser(TOKEN, uuid);
            const users = await allUser(TOKEN);
            setUsers(users.data.usersDatas);
            if (response.status === 200) {
                if (response.isRemoved) {
                    setMessage("User Deleted !");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const users = await allUser(TOKEN);
                setUsers(users.data.usersDatas);
            } catch(error) {
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
                <ol className="user-list">
                    {users.length < 0 ? (
                        <Loading />
                    ) : (
                        users.map((user) => {
                            return (
                                <li key={user.user_id}>
                                    {user.email} - <Link to={`./../detail/${user.uuid}`}>DETAIL</Link> - <Button onClickHandler={(e) => clickRemove(e, user.uuid)}>SUPPRIMER</Button>
                                </li>
                            );
                        })
                    )}
                </ol>
            {message && <p>{message}</p>}
            </section>
        </main>
    );
}

export default UserTable;
