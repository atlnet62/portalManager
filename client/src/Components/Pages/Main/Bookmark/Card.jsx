import { useState } from "react";
import { updateCounter } from "../../../../services/API/bookmark";

// component card for 1 bookmark for an user

function Card({ bookmark, myProfile }) {
    const TOKEN = localStorage.getItem("uat");
    const [message, setMessage] = useState(null);

    const upCounter = async (id) => {
        try {
            if (TOKEN && id) {
                await updateCounter(TOKEN, id);
            }
        } catch (error) {
            setMessage("We have some connection problems with the database.");
        }
    };

    return (
        message ?
            <article className="popup">
                <p>{message}</p>
            </article>
        :
            myProfile.uuid && (
                <article className="Card">
                    {/* Prise en compte du clic molette et des clic droite gauche */}
                    <a onClick={() => upCounter(bookmark.bookmark_id)} onMouseDown={(e) => upCounter(bookmark.bookmark_id)} href={`${bookmark.link}`}>
                        <abbr title={`${bookmark.click_counter} clics`}>
                            <img src={`/datas/${myProfile.uuid}/cache/${bookmark.picture_title}`} alt={bookmark.title} />
                            <p>{bookmark.title}</p>
                        </abbr>
                    </a>
                </article>
            )
    );
}

export default Card;
