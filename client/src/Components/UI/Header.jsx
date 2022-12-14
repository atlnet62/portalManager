import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faUser, faHouseChimney, faDashboard, faChalkboard, faXmark, faBars, faMailBulk } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const { isLogged, myProfile } = useSelector((state) => ({ ...state.user }));

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
                {widthScreen < 3840 && (
                    <abbr title="Menu">
                        <button id="menu-btn" onClick={handleClick}>
                            {myProfile !== null ? (
                                myProfile.avatar === "00.png" ? (
                                    <img src={`/datas/avatars/${myProfile.avatar}`} alt="this is the avatar" className="rotate" />
                                ) : (
                                    <img src={`/datas/avatars/${myProfile.avatar}`} alt="this is the avatar" />
                                )
                            ) : (
                                <FontAwesomeIcon icon={isActive ? faXmark : faBars} />
                            )}
                        </button>
                    </abbr>
                )}
                <h1>PORTAL MANAGER<aside>designed by</aside></h1>
                <nav className={`${widthScreen < 3840 ? (isActive ? "menu-display" : "menu-off") : "menu-display"}`} onClick={handleClick}>
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
                            <Link to="/main">
                                <FontAwesomeIcon icon={faChalkboard} />
                                Bookmarks
                            </Link>
                            <Link to="/user/profile">
                                <FontAwesomeIcon icon={faUser} />
                                Profile
                            </Link>

                            {myProfile?.role_id === 3 ? (
                                <Link to="/admin">
                                    <FontAwesomeIcon icon={faDashboard} />
                                    Admin
                                </Link>
                            ) : null}
                            <Link to="/user/signout">
                                <FontAwesomeIcon icon={faLock} />
                                Signout
                            </Link>
                        </>
                    )}
                    <Link to="/contact">
                        <FontAwesomeIcon icon={faMailBulk} />
                        Contact
                    </Link>
                </nav>
            </header>
            <div className={`${overlay ? "menu-overlay" : ""}`} onClick={handleClick}></div>
        </>
    );
}

export default Header;
