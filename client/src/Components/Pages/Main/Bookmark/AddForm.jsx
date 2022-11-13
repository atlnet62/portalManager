import { useState, useEffect, useRef } from "react";
import { validate } from "../../../../helpers/sanitize";
import { addBookmark } from "../../../../services/API/bookmark";
import { allCategory } from "../../../../services/API/category";

function AddBookmarkForm() {
    const TOKEN = localStorage.getItem("uat");

    const title = useRef();

    const [bookmarkInfos, setBookmarkInfos] = useState({ title: "", link: "", picture_title: "", idCategory: 0 });
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const bookmarkInfosValidation = validate("bookmark", bookmarkInfos);
        if (bookmarkInfosValidation === true) {
            try {
                setMessage("Bookmark reccording in progress...");
                const response = await addBookmark(TOKEN, bookmarkInfos);

                if (response.status !== 200) {
                    setMessage("You can't reccord the bookmark.");
                }

                if (response.data.isCreated) {
                    setMessage(`${bookmarkInfos.title} bookmark's is added !`);
                }
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        } else {
            setMessage(bookmarkInfosValidation);
        }
    };

    useEffect(() => {
        const allCategories = async () => {
            try {
                const categories = await allCategory(localStorage.getItem("uat"));

                if (categories.data.isRetrieved) {
                    setCategories(categories.data.category_datas);
                }

                if (categories.status !== 200) {
                    setMessage("You can't list the categories.");
                }
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        };
        allCategories();
        title.current.focus();
    }, []);

    return (
        <>
            {message && (
                <section className="popup">
                    <p>{message}</p>
                </section>
            )}

            <section className="add-bookmark">
                <h3>bookmark add form</h3>

                <form onSubmit={onSubmitHandler}>
                    <input ref={title} type="text" placeholder="Title ?" onChange={(e) => setBookmarkInfos({ ...bookmarkInfos, title: e.target.value, picture_title: `${e.target.value}.webp` })} />

                    <input id="link" type="text" placeholder="Link ?" onChange={(e) => setBookmarkInfos({ ...bookmarkInfos, link: e.target.value })} />

                    <select value={!bookmarkInfos.idCategory ? "0" : bookmarkInfos.idCategory} onChange={(e) => setBookmarkInfos({ ...bookmarkInfos, idCategory: parseInt(e.target.value) })}>
                        <option value="0">Without Category</option>
                        {categories.map((category) => {
                            return (
                                <option key={category.categoryID} value={category.categoryID}>
                                    {category.title}
                                </option>
                            );
                        })}
                    </select>

                    <input type="submit" value="Send" />
                </form>
            </section>
        </>
    );
}

export default AddBookmarkForm;
