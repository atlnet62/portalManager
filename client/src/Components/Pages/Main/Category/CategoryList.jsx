import { useEffect, useState, Fragment } from "react";
import { allCategory, removeCategory, updateCategory } from "../../../../services/API/category";
import Button from "../../../UI/Elements/Button/Index";
import { faCheck, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validate } from "../../../../helpers/sanitize";

function CategoryList() {
    const TOKEN = localStorage.getItem("uat");

    const [categories, setCategories] = useState([]);
    const [categoryInfos, setCategoryInfos] = useState({ categoryID: 0, title: "" });
    const [message, setMessage] = useState(null);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(0);

    const clickRemove = async (e, id) => {
        e.preventDefault();
        setMessage("");
        try {
            setMessage("Remove in progress...");
            const response = await removeCategory(TOKEN, id);
            if (response.data.isRemoved) {
                const indexCategory = categories.map((category) => category.categoryID);
                const newListCategories = categories;
                newListCategories.splice(indexCategory.indexOf(id), 1);
                setCategories(newListCategories);
                setMessage("The category is Deleted !");
            }
            if (response.status !== 200) {
                setMessage(response.data.errorMessage);
            }
        } catch (error) {
            setMessage("We have some connection problems with the database.");
        }
    };

    const clickEdit = async (e, edit, id, title) => {
        e.preventDefault();
        setMessage("");
        if (edit === true && editId === id) {
            const categoryInfosValidation = validate("category", categoryInfos);
            if (categoryInfosValidation === true) {
                try {
                    setMessage("Update in progress...");
                    const response = await updateCategory(TOKEN, id, { title: categoryInfos.title });
                    if (response.data.isModified) {
                        const newListCategories = categories;
                        const indexCategory = categories.map((category) => category.categoryID);
                        newListCategories.splice(indexCategory.indexOf(id), 1);
                        newListCategories.push(categoryInfos);
                        setCategories(newListCategories);
                        setMessage(`Category ${categoryInfos.title} is updated.`);
                    }
                    if (response.status !== 200) {
                        setMessage(response.data.errorMessage);
                    }
                } catch (error) {
                    setMessage("We have some connection problems with the database.");
                }
                setEditId(0);
                setCategoryInfos({ title: "" });
                setEdit(!edit);
            } else {
                setMessage(categoryInfosValidation);
            }
        }

        if (edit === false) {
            setEditId(id);
            setEdit(!edit);
            setCategoryInfos({ categoryID: id, title: title });
        }
    };

    useEffect(() => {
        const allCategories = async () => {
            try {
                const categories = await allCategory(localStorage.getItem("uat"));
                setCategories(categories.data.category_datas);
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        };
        allCategories();
    }, []);

    return (
        <>
            {message &&
                <section className="popup">
                    <p>{message}</p>
                </section>
            }

            <section className="category-list">
                <h3>Category list {edit && "[Edit in progress]"}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category) => {
                            return (
                                <Fragment key={category.categoryID}>
                                    <tr>
                                        <td>{category.categoryID}</td>
                                        <td>
                                            {edit && editId === category.categoryID ? (
                                                <input type="text" value={categoryInfos.title} onChange={(e) => setCategoryInfos({ categoryID: category.categoryID, title: e.target.value })} />
                                            ) : (
                                                category.title
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                className={edit ? "btn-valid" : "btn-edit"}
                                                onClickHandler={(e) => {
                                                    clickEdit(e, edit, category.categoryID, category.title);
                                                }}>
                                                {edit && editId === category.categoryID ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPen} />}
                                            </Button>
                                        </td>
                                        <td>
                                            <Button className="btn-del" onClickHandler={(e) => clickRemove(e, category.categoryID)}>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </Button>
                                        </td>
                                    </tr>
                                </Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default CategoryList;