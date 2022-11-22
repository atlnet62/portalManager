import { useEffect, useState, Fragment } from "react";
import Button from "../../../UI/Elements/Button/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark, faCheck, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { validate } from "../../../../helpers/sanitize";
import { allCategory } from "../../../../services/API/category";
import { getBookmarks, removeBookmark, updateBookmark } from "../../../../services/API/bookmark";

// component to list bookmarks for an user

function BookmarkList() {
    const TOKEN = localStorage.getItem("uat");

    // hook cata et bookmark list
    const [bookmarks, setBookmarks] = useState([]);
    const [categories, setCategories] = useState([]);

    // hook modify content bookmark
    const [bookmarkInfos, setBookmarkInfos] = useState({ bookmark_id: 0, title: "", link: "", click_counter: 0, category_id: 0 });
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(0);

    // hook message
    const [message, setMessage] = useState(null);

    // hook sliders
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(9);

    const clickRemove = async (e, id) => {
        e.preventDefault();
        setMessage("");
        try {
            if (TOKEN && id) {
                setMessage("Remove in progress...");
                const response = await removeBookmark(TOKEN, id);

                if (response.status !== 200) {
                    setMessage("Sorry, We can't update the database, please contact your admin.");
                }

                if (response.data.isRemoved) {
                    const indexBookmark = bookmarks.map((bookmark) => bookmark.bookmark_id);
                    const newListBookmarks = bookmarks;
                    newListBookmarks.splice(indexBookmark.indexOf(id), 1);
                    setBookmarks(newListBookmarks);
                    setMessage(`${bookmarkInfos.title} bookmark's is Deleted !`);
                }
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
                    if (TOKEN && bookmark.bookmark_id && bookmarkInfos) {
                        setMessage("Update in progress...");
                        const response = await updateBookmark(TOKEN, bookmark.bookmark_id, bookmarkInfos);

                        if (response.status !== 200) {
                            setMessage("Sorry, We can't update the database, please contact your admin.");
                        }

                        if (response.data.isModified) {
                            const newBookmarks = bookmarks;
                            const indexBookmark = bookmarks.map((bookmark) => bookmark.bookmark_id);
                            newBookmarks.splice(indexBookmark.indexOf(bookmark.bookmark_id), 1);
                            newBookmarks.push(bookmarkInfos);
                            setBookmarks(newBookmarks);
                            setMessage(`${bookmarkInfos.title} bookmark's is updated !`);
                        }
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

    // page --
    const handlePageDec = (e) => {
        e.preventDefault();
        setMin((prev) => prev - 10);
        setMax((prev) => prev - 10);
    };

    // page ++
    const handlePageInc = (e) => {
        e.preventDefault();
        if (max >= bookmarks.length) {
            setMin(0);
            setMax(9);
            return;
        }
        setMin((prev) => prev + 10);
        setMax((prev) => prev + 10);
    };

    useEffect(() => {
        const allCategories = async () => {
            try {
                if (TOKEN) {
                    const categories = await allCategory(TOKEN);
                    if (categories.status !== 200) {
                        setMessage("You can't list the categories.");
                    }
                    if (categories.status === 200) {
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

    useEffect(() => {
        const allBookmarks = async () => {
            try {
                if (TOKEN) {
                    const bookmarks = await getBookmarks(TOKEN);
                    if (bookmarks.status !== 200) {
                        setMessage("You can't list the bookmarks.");
                    }
                    if (bookmarks.data.isRetrieved) {
                        setBookmarks(bookmarks.data.bookmarkDatas);
                    }
                }
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        };
        allBookmarks();
        // eslint-disable-next-line
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
                            <th>Cat.</th>
                            <th>Pop.</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookmarks.map((bookmark, index) => {
                            return (
                                index >= min &&
                                index <= max && (
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
                                                        value={isNaN(bookmarkInfos.click_counter) ? 0 : bookmarkInfos.click_counter}
                                                        onChange={(e) => setBookmarkInfos({ ...bookmarkInfos, click_counter: isNaN(e.target.value) ? 0 : parseInt(e.target.value) })} />
                                                ) : (
                                                    bookmark.click_counter
                                                )}
                                            </td>
                                            <td>
                                                <Button
                                                    className={edit && editId === bookmark.bookmark_id ? "btn-valid" : "btn-edit"}
                                                    onClickHandler={(e) => {
                                                        clickEdit(e, edit, bookmark);
                                                    }}>
                                                    {edit && editId === bookmark.bookmark_id ? (
                                                        <abbr title="valid">
                                                            <FontAwesomeIcon icon={faCheck} />
                                                        </abbr>
                                                    ) : (
                                                        <abbr title="modify">
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </abbr>
                                                    )}
                                                </Button>
                                            </td>
                                            <td>
                                                <Button isDisabled={edit && true} className="btn-del" onClickHandler={(e) => clickRemove(e, bookmark.bookmark_id)}>
                                                    <abbr title="remove">
                                                        <FontAwesomeIcon icon={faXmark} />
                                                    </abbr>
                                                </Button>
                                            </td>
                                        </tr>
                                    </Fragment>
                                )
                            );
                        })}
                    </tbody>
                    {bookmarks.length > 10 && (
                        <tfoot>
                            <tr>
                                {min > 0 && (
                                    <td colSpan={7}>
                                        <Button className="btn" onClickHandler={(e) => handlePageDec(e)}>
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                        </Button>
                                    </td>
                                )}
                                {max < bookmarks.length && (
                                    <td colSpan={7}>
                                        <Button className="btn" onClickHandler={(e) => handlePageInc(e)}>
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        </tfoot>
                    )}
                </table>
            </section>
        </>
    );
}

export default BookmarkList;
