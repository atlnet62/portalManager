import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { removeBookmark, updateCounter } from "../../../../services/API/bookmark";

function Card({ bookmark, myProfile }) {
    const TOKEN = localStorage.getItem("uat");
    const [message, setMessage] = useState(null);

    const upCounter = async (e, id) => {
        e.preventDefault();
        try {
            await updateCounter(TOKEN, id);
        } catch (error) {
            console.log(error);
        }
    };

    const clickRemove = async (e, id) => {
        e.preventDefault();
        try {
            const response = await removeBookmark(TOKEN, id);
            if (response.data.isRemoved) {
                setMessage("Bookmark Deleted !");
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        myProfile.uuid && (
            <article className="Card">
                <button className="btn-del" onClick={(e) => clickRemove(e, bookmark.bookmark_id)}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                {/* Prise en compte du clic molette et des clic droite gauche */}
                <a onClick={(e) => upCounter(bookmark.bookmark_id)} onMouseDown={(e) => upCounter(e, bookmark.bookmark_id)} href={`${bookmark.link}`}>
                    <abbr title={`${bookmark.click_counter} clics`}>
                        <img src={`/datas/${myProfile.uuid}/cache/${bookmark.picture_title}`} alt={bookmark.title} />
                        <h3>{bookmark.title}</h3>
                    </abbr>
                </a>
            </article>
        )
    );
}

export default Card;
