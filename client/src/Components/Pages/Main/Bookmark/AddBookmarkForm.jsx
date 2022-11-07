import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { addBookmark } from "../../../../services/API/bookmark";

function AddBookmarkForm() {
    const TOKEN = localStorage.getItem("uat");

    const title = useRef();

    const [inputs, setInputs] = useState({ title: "", link: "", picture_title: "", idCategory: "" });

    const [message, setMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setMessage("Bookmark reccording in progress...");
            const response = await addBookmark(TOKEN, inputs);
            if (response.status) {
                setMessage("reccording error !");
            }
            if (response.status === 200) {
                setMessage("Bookmark is added.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        title.current.focus();
    }, []);

    // console.log(inputs);

    return (
        <main id="add-bookmark">
            <h2>bookmark add form</h2>

            <form onSubmit={onSubmitHandler}>
                <input ref={title} type="text" placeholder="Title ?" onChange={(e) => setInputs({ ...inputs, title: e.target.value, picture_title: `${e.target.value}.webp` })} />
                <input type="text" placeholder="Link ?" onChange={(e) => setInputs({ ...inputs, link: e.target.value })} />
                <input type="text" placeholder="Category ?" onChange={(e) => setInputs({ ...inputs, idCategory: e.target.value })} />
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

export default AddBookmarkForm;
