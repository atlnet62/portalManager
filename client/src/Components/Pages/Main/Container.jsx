import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/Elements/Button/Index";
import AddCategoryForm from "./Category/AddForm";
import AddBookmarkForm from "./Bookmark/AddForm";
import CategoryList from "./Category/CategoryList";
import BookmarkList from "./Bookmark/BookmarkList";

// display menu to manage bookmark / category

function AddMenu({ myBookmarks }) {
    const [categoryToggle, setCategoryToggle] = useState(false);
    const [bookmarkToggle, setBookmarkToggle] = useState(true);
    const [addBookmarkToggle, setAddBookmarkToggle] = useState(false);
    const [addCategoryToggle, setAddCategoryToggle] = useState(false);

    const clickSwitch = (e, choice) => {
        e.preventDefault();
        if (choice === 0) {
            setCategoryToggle(!categoryToggle);
            setBookmarkToggle(false);
            setAddCategoryToggle(false);
            setAddBookmarkToggle(false);
        }
        if (choice === 1) {
            setBookmarkToggle(!bookmarkToggle);
            setCategoryToggle(false);
            setAddCategoryToggle(false);
            setAddBookmarkToggle(false);
        }
        if (choice === 2) {
            setAddCategoryToggle(!addCategoryToggle);
            setBookmarkToggle(false);
            setCategoryToggle(false);
            setAddBookmarkToggle(false);
        }
        if (choice === 3) {
            setAddBookmarkToggle(!addBookmarkToggle);
            setAddCategoryToggle(false);
            setBookmarkToggle(false);
            setCategoryToggle(false);
        }
    };

    return (
        <main id="panel">
            <h2>PANEL MANAGEMENT</h2>

            <section className="btn-manager">
                <Link className="btn" to=".." onClick={() => window.location.reload(false)}>
                    Main page
                </Link>
            </section>

            <section className="btn-manager">
                <Button className={"btn"} onClickHandler={(e) => clickSwitch(e, 0)}>
                    Show Category List
                </Button>
                <Button className={"btn"} onClickHandler={(e) => clickSwitch(e, 1)}>
                    Show Bookmark List
                </Button>
                <Button className={"btn"} onClickHandler={(e) => clickSwitch(e, 2)}>
                    Show Category Form
                </Button>
                <Button className={"btn"} onClickHandler={(e) => clickSwitch(e, 3)}>
                    Show Bookmark Form
                </Button>
            </section>

            {categoryToggle && <CategoryList />}

            {bookmarkToggle && <BookmarkList myBookmarks={myBookmarks} />}

            {addBookmarkToggle && <AddBookmarkForm />}

            {addCategoryToggle && <AddCategoryForm />}
        </main>
    );
}

export default AddMenu;
