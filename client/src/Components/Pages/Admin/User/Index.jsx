import React, { useEffect, useState } from "react";
import Loading from "../../../../Components/UI/Elements/Loading";
import { allUser } from "../../../../services/API/user";
import { Link } from "react-router-dom";

function UserTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const TOKEN = localStorage.getItem("uat");
        const getUsers = async () => {
            const users = await allUser(TOKEN);
            setUsers(users.data.usersDatas);
        };
        getUsers();
    }, []);

    return (
        <main id="user-list">
            <section>
                <h2>User list by email</h2>
                <ol className="user-list">
                    {users.length < 0 ? (
                        <Loading />
                    ) : (
                        users.map((user) => {
                            return (
                                <li key={user.user_id}>
                                    {user.email} - <Link to={`./../detail/${user.uuid}`}>DETAIL</Link>
                                </li>
                            );
                        })
                    )}
                </ol>
            </section>
        </main>
    );
}

export default UserTable;
