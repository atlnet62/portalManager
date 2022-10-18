import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Error from "../../Pages/Error";

function Panel({ userInfos }) {
    
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = () => {
            if (userInfos.role_id === 3) {
                setIsAdmin(true);
            }
        };
        checkAdmin();
        // eslint-disable-next-line
    }, []);

    return isAdmin ? (
        <main id="panel">
            <h2>ADMIN DASHBOARD</h2>

            <section id="user_panel">
                <Link to="user/all">User list</Link>
            </section>

            <section>
                <p>
                    
                </p>
            </section>

        </main>
    ) : (
        <Error message={"You are not allowed to access at this panel"} />
    );
}

export default Panel;
