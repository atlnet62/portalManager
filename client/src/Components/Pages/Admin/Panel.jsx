import { useState, useEffect } from "react";
import Error from "../../Pages/Error";
import Button from "../../UI/Elements/Button/Index";
import AddUserForm from "./User/AddForm";
import UserList from "./User/UserList";

function MainPanel({ myProfile }) {
    
    const [isAdmin, setIsAdmin] = useState(false);

    const [userToggle, setUserToggle] = useState(true);
    const [userFormToggle, setUserFormToggle] = useState(false);


    const clickSwitch = (e, choice) => {
        e.preventDefault();
        if (choice === 0) {
            setUserToggle(!userToggle);
            setUserFormToggle(false);

        }
        if (choice === 1) {
            setUserFormToggle(!userFormToggle);
            setUserToggle(false);

        }
    };

    useEffect(() => {
        const checkAdmin = () => {
            if (myProfile.role_id === 3) {
                setIsAdmin(true);
            }
        };
        checkAdmin();
        // eslint-disable-next-line
    }, []);

    return isAdmin ? (
        <main id="panel">
            <h2>ADMIN DASHBOARD</h2>
            <section className="btn-manager">
                <Button className="btn" onClickHandler={(e) => clickSwitch(e, 0)}>Show User List</Button>
                <Button className="btn" onClickHandler={(e) => clickSwitch(e, 1)}>Show User Form</Button>
            </section>

            {userToggle && <UserList />}
            {userFormToggle && <AddUserForm />}


        </main>
    ) : (
        <Error message={"You are not allowed to access at this panel"} />
    );
}

export default MainPanel;
