import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { allCategory } from "../../../services/API/category";
import Card from "./Bookmark/Card";
import Button from "../../UI/Elements/Button/Index";

function Bookmarks({ myBookmarks, myProfile }) {
    
    const [toggleSearch, setToggleSearch] = useState(false);
    const [toggleCategory, setToggleCategory] = useState(false);
    const [filter, setFilter] = useState(-1);
    const [categories, setCategories] = useState(null);

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

    useEffect(() => {
        const allCategories = async () => {
            try {
                const categories = await allCategory(localStorage.getItem("uat"));
                setCategories(categories.data.category_datas);
            } catch (error) {
                console.log(error);
            }
        };
        allCategories();
    }, []);

    return (
        <main id="bookmarks">
            <h2>DASHBOARD</h2>

            <section className="btn-manager">
                <Link className="btn" to="#" onClick={(e) => toggleSwitch(e, 0)}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Link>
                <Button className="btn" to="#" onClickHandler={(e) => toggleSwitch(e, 1)}>
                    Category
                </Button>
                <Link className="btn" to="./add">
                    <FontAwesomeIcon icon={faGear} />
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

            <section id="bookmark-list">
                {myBookmarks.map((myBookmark) => {
                    return (
                        <Fragment key={myBookmark.bookmark_id}>
                            {filter !== 0 ? (
                                myBookmark.category_id === filter && filter > 0 ? (
                                    <Card bookmark={myBookmark} myProfile={myProfile} />
                                ) : (
                                    filter === -1 && <Card bookmark={myBookmark} myProfile={myProfile} />
                                )
                            ) : myBookmark.category_id === null ? (
                                <Card bookmark={myBookmark} myProfile={myProfile} />
                            ) : null}
                        </Fragment>
                    );
                })}
            </section>
        </main>
    );
}

export default Bookmarks;
