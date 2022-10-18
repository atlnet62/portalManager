import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faLock, faLockOpen, faUser, faXmark, faHouseChimney, faDashboard } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const { isLogged, userInfos } = useSelector((state) => ({ ...state.user }));

    const [isActive, setIsActive] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);

    const handleClick = () => {
        setIsActive(!isActive);
        setOverlay(!overlay);
    };

    useEffect(() => {
        const handleResize = () => {
            setWidthScreen(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    return (
        <>
            <header>
                {widthScreen < 1280 && (
                    <button id="menu-btn" onClick={handleClick}>
                        {<FontAwesomeIcon icon={isActive ? faXmark : faBars} />}
                        {widthScreen > 768 && " MENU"}{" "}
                    </button>
                )}
                <h1>PORTAL MANAGER</h1>
                <nav className={`${widthScreen < 1280 ? (isActive ? "menu-display" : "menu-off") : "menu-display"}`} onClick={handleClick}>
                    <Link to="/home">
                        <FontAwesomeIcon icon={faHouseChimney} />
                        Home
                    </Link>

                    {!isLogged ? (
                        <Link to="/user">
                            <FontAwesomeIcon icon={faLockOpen} />
                            Sign-in/up
                        </Link>
                    ) : (
                        <>
                            <Link to="/portal">Portal</Link>
                            <Link to="/user/profile">
                                <FontAwesomeIcon icon={faUser} />
                                Profile
                            </Link>

                            {userInfos?.role_id === 3 ? (
                                <Link to="/admin">
                                    <FontAwesomeIcon icon={faDashboard} />
                                    Admin
                                </Link>
                            ) : userInfos?.role_id === 2 ? (
                                <Link to="/moderator">Moderator</Link>
                            ) : null}
                            <Link to="/user/signout">
                                <FontAwesomeIcon icon={faLock} />
                                Signout
                            </Link>
                        </>
                    )}
                </nav>
            </header>
            <div className={`${overlay ? "menu-overlay" : ""}`} onClick={handleClick}></div>
        </>
    );
}

export default Header;
