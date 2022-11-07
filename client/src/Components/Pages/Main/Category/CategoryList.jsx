import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allCategory } from "../../../../services/API/category";
import Button from "../../../UI/Elements/Button/Index";
import Loading from "../../../UI/Elements/Loading";


function CategoryList() {
    const TOKEN = localStorage.getItem("uat");
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState(null);

    let count = -1;

    const clickRemove = () => {

    }

    useEffect(() => {
        const getCategories = async () => {
            const categories = await allCategory(localStorage.getItem("uat"));
            setCategories(categories.data.categoriesDatas);
        }
        getCategories();
    }, []);


    
    return (
        <main id="category">
            <h2>Category list</h2>
            <section id="bookmark-list">
                        <table className="user-list">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length < 0 ? (
                                <Loading />
                            ) : (
                                categories.map((category) => {
                                    count++;
                                    return (
                                        <Fragment key={count}>
                                            <tr>
                                                <td>{category.id}</td>
                                                <td>{category.title}</td>
                                                <td>
                                                    <Link to={`./../detail/${category.id}`}>DETAIL</Link>
                                                </td>
                                                <td>
                                                    <Button onClickHandler={(e) => clickRemove(e, category.id)}>SUPPRIMER</Button>
                                                </td>
                                            </tr>
                                        </Fragment>
                                    );
                                })
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="5">{message}</td>
                            </tr>
                        </tfoot>
                    </table>
            </section>
        </main>
    );
}

export default CategoryList;
