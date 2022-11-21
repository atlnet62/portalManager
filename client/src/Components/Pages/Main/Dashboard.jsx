import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { allCategory } from "../../../services/API/category";
import Card from "./Bookmark/Card";
import Button from "../../UI/Elements/Button/Index";

function Dashboard({ myBookmarks, myProfile }) {
    const TOKEN = localStorage.getItem("uat");

    const [toggleSearch, setToggleSearch] = useState(false);
    const [toggleCategory, setToggleCategory] = useState(false);
    const [filter, setFilter] = useState(-1);
    const [categories, setCategories] = useState(null);
    const [message, setMessage] = useState(null);

    // hook sliders
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(14);

    const onChangeHandler = (e) => {
        setFilter(parseInt(e));
    };

    const toggleSwitch = (e, state) => {
        e.preventDefault();
        if (state === 0) {
            setToggleSearch(!toggleSearch);
            setToggleCategory(false);
        }
        if (state === 1) {
            setToggleCategory(!toggleCategory);
            setToggleSearch(false);
        }
    };

    const handlePageDec = (e) => {
        e.preventDefault();
        setMin((prev) => prev - 15);
        setMax((prev) => prev - 15);
    };

    const handlePageInc = (e) => {
        e.preventDefault();
        if (max === myBookmarks.length - 1) {
            setMin(0);
            setMax(9);
            return;
        }
        setMin((prev) => prev + 15);
        setMax((prev) => prev + 15);
    };

    useEffect(() => {
        const allCategories = async () => {
            try {
                if (TOKEN) {
                    const categories = await allCategory(TOKEN);
                    if (categories.status !== 200) {
                        setMessage("You can't list the categories.");
                    }
                    if (categories.status === 200){
                        setCategories(categories.data.categoryDatas);
                    }
                }
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        };
        allCategories();
        // eslint-disable-next-line
    }, []);

    return (
        <main id="bookmarks">
            <h2>DASHBOARD</h2>

            <section className="btn-manager">
                <Button className="btn" to="#" onClickHandler={(e) => toggleSwitch(e, 0)}>
                    <abbr title="search"><FontAwesomeIcon icon={faMagnifyingGlass} /></abbr>
                </Button>
                <Button className="btn" to="#" onClickHandler={(e) => toggleSwitch(e, 1)}>
                <abbr title="Category">Category</abbr>
                </Button>
                <Link className="btn" to="./panel">
                <abbr title="Panel Management"><FontAwesomeIcon icon={faGear} /></abbr>
                </Link>
            </section>

            {toggleSearch && (
                <section id="search-bar">
                    <form action="https://www.google.fr/search?q=">
                        <input type="text" placeholder="Google... + [enter]" name="q" />
                    </form>
                </section>
            )}

            {toggleCategory && (
                <section className="category-bar">
                    <select onChange={(e) => onChangeHandler(e.target.value)} value={filter}>
                        <option value="-1">all Categories</option>
                        <option value="0">without Categories</option>
                        {categories.map((category) => {
                            return (
                                <option key={category.categoryID} value={category.categoryID}>
                                    {category.title}
                                </option>
                            );
                        })}
                    </select>
                </section>
            )}

            {message && (
                <section className="popup">
                    <p>{message}</p>
                </section>
            )}

            <section className="dash-bookmark-list">
                {myBookmarks.map((myBookmark, index) => {
                    return (
                        <Fragment key={myBookmark.bookmark_id}>
                            {filter !== 0 ? (
                                myBookmark.category_id === filter && filter > 0 ? (
                                    <Card bookmark={myBookmark} myProfile={myProfile} />
                                ) : (
                                    index >= min && index <= max && filter === -1 && <Card bookmark={myBookmark} myProfile={myProfile} />
                                )
                            ) : myBookmark.category_id === null ? (
                                <Card bookmark={myBookmark} myProfile={myProfile} />
                            ) : null}
                        </Fragment>
                    );
                })}
            </section>

            {myBookmarks.length > 15 && filter === -1 && (
                <section className="btn-manager">
                    {min > 0 && (
                        <Button className="btn" onClickHandler={(e) => handlePageDec(e)}>
                            <abbr title="previous"><FontAwesomeIcon icon={faArrowLeft} /></abbr>
                        </Button>
                    )}
                    {max < myBookmarks.length && (
                        <Button className="btn" onClickHandler={(e) => handlePageInc(e)}>
                            <abbr title="next"><FontAwesomeIcon icon={faArrowRight} /></abbr>
                        </Button>
                    )}
                </section>
            )}
        </main>
    );
}

export default Dashboard;
