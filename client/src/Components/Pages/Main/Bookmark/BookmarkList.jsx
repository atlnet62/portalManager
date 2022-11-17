import { useEffect, useState, Fragment } from "react";
import { allCategory } from "../../../../services/API/category";
import { getBookmarks, removeBookmark, updateBookmark } from "../../../../services/API/bookmark";
import Button from "../../../UI/Elements/Button/Index";
import { faPen, faXmark, faCheck, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validate } from "../../../../helpers/sanitize";

function BookmarkList() {
    const TOKEN = localStorage.getItem("uat");

    // hook cata et bookmark list
    const [bookmarks, setBookmarks] = useState([]);
    const [categories, setCategories] = useState([]);

    // hook modify content bookmark
    const [bookmarkInfos, setBookmarkInfos] = useState({ bookmark_id: 0, title: "", link: "", click_counter: 0, category_id: 0 });
    const [message, setMessage] = useState(null);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(0);

    // hook sliders
    const [min, setMin] = useState(0);
	const [max, setMax] = useState(9);

    const clickRemove = async (e, id) => {
        e.preventDefault();
        setMessage("");
        try {
            setMessage("Remove in progress...");
            const response = await removeBookmark(TOKEN, id);

            if (response.data.isRemoved) {
                const indexBookmark = bookmarks.map((bookmark) => bookmark.bookmark_id);
                const newListBookmarks = bookmarks;
                newListBookmarks.splice(indexBookmark.indexOf(id), 1);
                setBookmarks(newListBookmarks);
                setMessage(`${bookmarkInfos.title} bookmark's is Deleted !`);
            }
            if (response.status !== 200) {
                setMessage("Sorry, We can't update the database, please contact your admin.");
            }
        } catch (error) {
            setMessage("We have some connection problems with the database.");
        }
    };

    const clickEdit = async (e, edit, bookmark) => {
        e.preventDefault();
        setMessage("");

        if (edit === true && editId === bookmark.bookmark_id) {
            const bookmarkInfosValidation = validate("bookmark", bookmarkInfos);

            if (bookmarkInfosValidation === true) {
                try {
                    setMessage("Update in progress...");
                    const response = await updateBookmark(TOKEN, bookmark.bookmark_id, bookmarkInfos);

                    if (response.data.isModified) {
                        const newBookmarks = bookmarks;
                        const indexBookmark = bookmarks.map((bookmark) => bookmark.bookmark_id);
                        newBookmarks.splice(indexBookmark.indexOf(bookmark.bookmark_id), 1);
                        newBookmarks.push(bookmarkInfos);
                        setBookmarks(newBookmarks);
                        setMessage(`${bookmarkInfos.title} bookmark's is updated !`);
                    }

                    if (response.status !== 200) {
                        setMessage("Sorry, We can't update the database, please contact your admin.");
                    }
                } catch (error) {
                    setMessage("We have some connection problems with the database.");
                }
                setEditId(0);
                setEdit(!edit);
            } else {
                setMessage(bookmarkInfosValidation);
            }
        }

        if (edit === false) {
            setEditId(bookmark.bookmark_id);
            setBookmarkInfos(bookmark);
            setEdit(!edit);
        }
    };

    const handlePageDec = (e) => {
        e.preventDefault();
        setMin(prev => prev - 10);
        setMax(prev => prev - 10);
    }
    
    const handlePageInc = (e) => {
        e.preventDefault();
        if (max >= bookmarks.length) {
            setMin(0);
            setMax(9);
            return;
        }
        setMin(prev => prev + 10)
        setMax(prev => prev + 10)
    }

    useEffect(() => {
        const allCategories = async () => {
            try {
                const categories = await allCategory(localStorage.getItem("uat"));
                setCategories(categories.data.categoryDatas);
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        };
        allCategories();
    }, []);
    
    useEffect(() => {
        const allBookmarks = async () => {
            try {
                const bookmarks = await getBookmarks(localStorage.getItem("uat"));
                if (bookmarks.data.isRetrieved) {
                    setBookmarks(bookmarks.data.bookmarkDatas);
                }
                
                if (bookmarks.status !== 200) {
                    setMessage("You can't list the bookmarks.");
                }
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        };
        allBookmarks();
    }, []);

    return (
        <>
            {message && (
                <section className="popup">
                    <p>{message}</p>
                </section>
            )}

            <section className="bookmark-list">
                <h3>Bookmark list {edit && "[Edit in progress]"}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Link</th>
                            <th>Category</th>
                            <th>Trending</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookmarks.map((bookmark, index) => {
                            return (index >= min && index <= max) && (
                                <Fragment key={bookmark.bookmark_id}>
                                    <tr>
                                        <td>{bookmark.bookmark_id}</td>
                                        <td>
                                            {edit && editId === bookmark.bookmark_id ? (
                                                <input type="text" value={bookmarkInfos.title} onChange={(e) => setBookmarkInfos({ ...bookmarkInfos, title: e.target.value })} />
                                            ) : (
                                                bookmark.title
                                            )}
                                        </td>
                                        <td>
                                            {edit && editId === bookmark.bookmark_id ? (
                                                <input type="text" value={bookmarkInfos.link} onChange={(e) => setBookmarkInfos({ ...bookmarkInfos, link: e.target.value })} />
                                            ) : (
                                                bookmark.link
                                            )}
                                        </td>
                                        <td>
                                            {edit && editId === bookmark.bookmark_id ? (
                                                <select
                                                    value={!bookmarkInfos.category_id ? "0" : bookmarkInfos.category_id}
                                                    onChange={(e) => setBookmarkInfos({ ...bookmarkInfos, category_id: parseInt(e.target.value) })}>
                                                    <option value="0">Without Category</option>
                                                    {categories.map((category) => {
                                                        return (
                                                            <option key={category.categoryID} value={category.categoryID}>
                                                                {category.title}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            ) : (
                                                categories.map((category) => {
                                                    return bookmark.category_id === category.categoryID && category.title;
                                                })
                                            )}
                                        </td>
                                        <td>
                                            {edit && editId === bookmark.bookmark_id ? (
                                                <input
                                                    type="number"
                                                    value={bookmarkInfos.click_counter}
                                                    onChange={(e) => setBookmarkInfos({ ...bookmarkInfos, click_counter: parseInt(e.target.value) })}
                                                />
                                            ) : (
                                                bookmark.click_counter
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                className={edit ? "btn-valid" : "btn-edit"}
                                                onClickHandler={(e) => {
                                                    clickEdit(e, edit, bookmark);
                                                }}>
                                                {edit && editId === bookmark.bookmark_id ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPen} />}
                                            </Button>
                                        </td>
                                        <td>
                                            <Button isDisabled={edit && true} className="btn-del" onClickHandler={(e) => clickRemove(e, bookmark.bookmark_id)}>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </Button>
                                        </td>
                                    </tr>
                                </Fragment>
                            );
                        })}
                    </tbody>
                    {
                        bookmarks.length > 10 &&
                        <tfoot>
                            <tr>
                                {
                                    min > 0 && 
                                        <td>
                                            <Button className="btn" onClickHandler={(e) => handlePageDec(e)}><FontAwesomeIcon icon={faArrowLeft} /></Button>
                                        </td>
                                }
                                {
                                    max < bookmarks.length && 
                                        <td>
                                            <Button className="btn" onClickHandler={(e) => handlePageInc(e)}><FontAwesomeIcon icon={faArrowRight} /></Button>
                                        </td>
                                }
                            </tr>
                        </tfoot>
                    }
                </table>
            </section>
        </>
    );
}

export default BookmarkList;
