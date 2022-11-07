import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Bookmark/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { allCategory } from "../../../services/API/category";

function Bookmarks({ myBookmarks, myProfile }) {
    const [toggleSearch, setToggleSearch] = useState(false);
    const [toggleCategory, setToggleCategory] = useState(false);
    const [filter, setFilter] = useState(-1);

    const [categories, setCategories] = useState(null);

    const onChangeHandler = (e) => {
        setFilter(parseInt(e));
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

            {toggleSearch && (
                <section id="search-bar">
                    <form action="https://www.google.fr/search?q=">
                        <input type="text" placeholder="Google..." name="q" />
                    </form>
                </section>
            )}

            <section className="btn-manager">
                <Link className="btn" to="#" onClick={() => setToggleSearch(!toggleSearch)}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Link>
                <Link className="btn" to="#" onClick={() => setToggleCategory(!toggleCategory)}>
                    Category
                </Link>
                <Link className="btn" to="./add">
                    <FontAwesomeIcon icon={faPlus} />
                </Link>
            </section>

            {toggleCategory && (
                <section className="category-list">
                    <select onChange={(e) => onChangeHandler(e.target.value)} value={filter}>
                        <option value="-1">all Categories</option>
                        <option value="0">without Categories</option>
                        {categories.map((category) => {
                            return <option key={category.categoryID} value={category.categoryID}>{category.title}</option>;
                        })}
                    </select>
                </section>
            )}

            <section id="bookmark-list">
                {myBookmarks.map((myBookmark) => {
                    console.log(myBookmark.category_id);
                    return (
                        <Fragment key={myBookmark.bookmark_id}>
                        {
                            filter !== 0
                            ? 
                                myBookmark.category_id === filter && filter > 0
                                ? 
                                    <Card bookmark={myBookmark} myProfile={myProfile} />
                                : 
                                filter === -1 && <Card bookmark={myBookmark} myProfile={myProfile} />
                                    
                            :
                                myBookmark.category_id === null 
                                ? 
                                    <Card bookmark={myBookmark} myProfile={myProfile} />
                                : 
                                    null
                        }
                        </Fragment>
                    );
                })}
            </section>
        </main>
    );
}

export default Bookmarks;
