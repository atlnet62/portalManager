import Error from "../Error";
function Profile({ userInfos }) {
    //console.log(userInfos)

    return userInfos === null ? (
        <Error />
    ) : (
        <main id="profile">
            <table>
                <thead>
                    <tr>
                        <th colSpan="3">
                            <h2>Profile</h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Avatar :</td>
                        <td>
                            <img src={userInfos.avatar !== "default.png" ? `/datas/${userInfos.uuid}/${userInfos.avatar}` : `/datas/default/${userInfos.avatar}`} alt="this is the avatar" />
                        </td>
                        <td>
                            <button>Change</button>
                        </td>
                    </tr>

                    <tr>
                        <td>Alias :</td>
                        <td>{userInfos.alias ? userInfos.alias : null}</td>
                        <td>
                            <button>Change</button>
                        </td>
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
                    </tr>

                    <tr>
                        <td>Account type</td>
                        <td>{userInfos.user_role}</td>
                    </tr>

                    <tr>
                        <td>Password</td>
                        {userInfos.reset_password !== 0 ? <td>Must be changed !</td> : <td>***</td>}
                        <td>
                            <button>Change</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}

export default Profile;
