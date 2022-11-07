import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { addCategory } from "../../../../services/API/category";

function AddCategoryForm() {
    const TOKEN = localStorage.getItem("uat");

    const title = useRef();

    const [inputs, setInputs] = useState({ title: "", link: "", picture_title: "", idCategory: "" });
    const [message, setMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await addCategory(TOKEN, inputs);
            console.log(response.status)
            if (response.status) {
                setMessage("reccording error !");
            }
            if (response.status === 200) {
                setMessage("Category is added.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        title.current.focus();
    }, []);

    return (
        <main id="add-category">
            <h2>category section</h2>
            <form onSubmit={onSubmitHandler}>
                <input ref={title} type="text" placeholder="Title ?" onChange={(e) => setInputs({ ...inputs, title: e.target.value })} />
                <input type="submit" value="Send" />
                {message && <p>{message}</p>}
            </form>


            <div className="divider"></div>

            <section id="btn-manager">
                <Link className="btn" to="../add">
                    Previous page
                </Link>
                <Link className="btn" to="..">
                    Main page
                </Link>
            </section>

        </main>
    );
}

export default AddCategoryForm;
