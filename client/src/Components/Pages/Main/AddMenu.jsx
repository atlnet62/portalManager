import { Link } from "react-router-dom";

function AddMenu() {
    return (
        <main id="add-panel">
            <h2>ADD PANEL</h2>

            <section id="btn-manager">

                <Link className="btn" to="../bookmark/add">
                    Add Bookmark
                </Link>

                <Link className="btn" to="../category/add">
                    Add Category
                </Link>
                
                <Link className="btn" to="..">
                    Main page
                </Link>
            </section>
        </main>
    );
}

export default AddMenu;
