import { Fragment, useEffect, useState } from "react";
import Loading from "../../../UI/Elements/Loading";
import { allUser, removeUser } from "../../../../services/API/user";
import { Link } from "react-router-dom";
import Button from "../../../UI/Elements/Button/Index";
import { faXmark, faIdCard, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Error from "../../Error";

// components user list for admin

function UserList() {
    const TOKEN = localStorage.getItem("uat");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);
    const [nbUsers, setNbUsers] = useState(0);

    // hook sliders
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(9);

    let count = 0;

    const clickRemove = async (e, uuid) => {
        e.preventDefault();
        try {
            if (TOKEN && uuid) {
                const response = await removeUser(TOKEN, uuid);
                if (response.data.isRemoved) {
                    setMessage("User Deleted !");
                    const indexUser = users.map((user) => user.uuid);
                    const newListUsers = users;
                    newListUsers.splice(indexUser.indexOf(uuid), 1);
                    setUsers(newListUsers);
                }
                if (response.status !== 200) {
                    setMessage("We can't deleted the use please contact your admin.");
                }
            }
        } catch (error) {
            setMessage("We have some connection problems with the database.");
        }
    };

    // page --
    const handlePageDec = (e) => {
        e.preventDefault();
        setMin((prev) => prev - 10);
        setMax((prev) => prev - 10);
    };

    // page ++
    const handlePageInc = (e) => {
        e.preventDefault();
        if (max >= users.length) {
            setMin(0);
            setMax(9);
            return;
        }
        setMin((prev) => prev + 10);
        setMax((prev) => prev + 10);
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                if (TOKEN) {
                    const users = await allUser(TOKEN);
                    if (users.status === 200) {
                        setUsers(users.data.usersDatas);
                        setNbUsers(users.data.nbUsers);
                    }
                    if (users.status !== 200) {
                        setMessage("You can't display the user list. please contact you admin.");
                    }
                }
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        };
        getUsers();
        // eslint-disable-next-line
    }, []);

    return users ? (
        <section>
            {message && (
                <article className="popup">
                    <p>{message}</p>
                </article>
            )}

            {users.length <= 0 ? (
                <article>
                    <Loading />
                </article>
            ) : (
                <article className="user-list">
                    <h3>User list by email</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>email</th>
                                <th>Role</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => {
                                count++;
                                return (
                                    index >= min &&
                                    index <= max && (
                                        <Fragment key={count}>
                                            <tr>
                                                <td>{count}</td>
                                                <td>{user.email}</td>
                                                <td>{user.userRole}</td>
                                                <td>
                                                    <Link className="btn-link" to={`user/detail/${user.uuid}`}>
                                                        <abbr title="modify"><FontAwesomeIcon icon={faIdCard} /></abbr>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button className="btn-del" onClickHandler={(e) => clickRemove(e, user.uuid)}>
                                                        <abbr title="remove"><FontAwesomeIcon icon={faXmark} /></abbr>
                                                    </Button>
                                                </td>
                                            </tr>
                                        </Fragment>
                                    )
                                );
                            })}
                        </tbody>
                        <tfoot>
                            {users.length > 10 && (
                                <tr>
                                {min > 0 && (
                                    <td>
                                        <Button className="btn" onClickHandler={(e) => handlePageDec(e)}>
                                            <abbr title="previous"><FontAwesomeIcon icon={faArrowLeft} /></abbr>
                                        </Button>
                                    </td>
                                )}
                                {max < users.length && (
                                    <td>
                                        <Button className="btn" onClickHandler={(e) => handlePageInc(e)}>
                                            <abbr title="next"><FontAwesomeIcon icon={faArrowRight} /></abbr>
                                        </Button>
                                    </td>
                                )}
                                </tr>
                            )}
                            <tr>
                                <td colSpan={6}>Total {nbUsers} users</td>
                            </tr>
                        </tfoot>
                    </table>
                </article>
            )}
        </section>
    ) : (
        <Error message={"User List is empty"} />
    );
}

export default UserList;
