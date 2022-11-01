import { Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";

function Portal({myBookmarks, myProfile}) {

    console.log("page portal")
    return (
        <main id="portal">
            <div className="btn-manager">
                <Link to="./add">add</Link>
            </div>

            <section>
                {myBookmarks.map((myBookmark) => {
                    return (
                        <Fragment key={myBookmark.bookmark_id}>
                            <Card {...myBookmark} {...myProfile} />
                        </Fragment>
                    );
                })}
            </section>
        </main>
    );
}

export default Portal;
