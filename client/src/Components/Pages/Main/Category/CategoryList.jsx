import { useEffect, useState, Fragment } from "react";
import { allCategory, removeCategory, updateCategory } from "../../../../services/API/category";
import Button from "../../../UI/Elements/Button/Index";
import { faCheck, faPen, faXmark, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validate } from "../../../../helpers/sanitize";

// component categoriy list for an user

function CategoryList() {
    const TOKEN = localStorage.getItem("uat");

    const [categories, setCategories] = useState([]);
    const [categoryInfos, setCategoryInfos] = useState({ categoryID: 0, title: "" });
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
            const response = await removeCategory(TOKEN, id);
            if (response.status === 200) {
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

    const handlePageDec = (e) => {
        e.preventDefault();
        setMin(prev => prev - 10);
        setMax(prev => prev - 10);
    
    }
    
    const handlePageInc = (e) => {
        e.preventDefault();
        if (max === categories.length) {
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
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category, index) => {
                            return (index >= min && index <= max) && (
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
                                                className={edit && editId === category.categoryID ? "btn-valid" : "btn-edit"}
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
                    {
                        categories.length > 10 &&
                        <tfoot>
                            <tr>

                                {
                                    min > 0 && 
                                    <td>
                                        <Button className="btn" onClickHandler={(e) => handlePageDec(e)}><FontAwesomeIcon icon={faArrowLeft} /></Button>
                                    </td>
                                }

                                {
                                    max < categories.length && 
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

export default CategoryList;