import { useState, useEffect, useRef } from "react";
import { validate } from "../../../../helpers/sanitize";
import { addCategory } from "../../../../services/API/category";

function AddCategoryForm() {
    const TOKEN = localStorage.getItem("uat");

    const title = useRef();

    const [categoryInfos, setCategoryInfos] = useState({ title: "" });
    const [message, setMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const categoryInfosValidation = validate("category", categoryInfos);
        if (categoryInfosValidation === true) {
            try {
                const response = await addCategory(TOKEN, categoryInfos);
                if (response.status !== 200) {
                    setMessage("You can't reccord the category.");
                }
    
                if (response.data.isCreated) {
                    setMessage(`Category ${categoryInfos.title} is added.`);
                }
                title.current.value = "";
            } catch (error) {
                setMessage("We have some connection problems with the database.");
            }
        } else {
            setMessage(categoryInfosValidation);
        }
    };

    useEffect(() => {
        title.current.focus();
    }, []);

    return (
        <>
            {message &&
                <section className="popup">
                    <p>{message}</p>
                </section>
            }

            <section className="add-category">
                <h3>category add form</h3>
                <form onSubmit={onSubmitHandler}>
                    <input ref={title} type="text" placeholder="Title ?" onChange={(e) => setCategoryInfos({ ...categoryInfos, title: e.target.value })} />
                    <input type="submit" value="Send" />
                </form>
            </section>
        </>
    );
}

export default AddCategoryForm;
