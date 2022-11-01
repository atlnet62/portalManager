import style from "./style.module.css";
import Loading from './../Elements/Loading';

function Card(props) {

    return (
        !props.uuid ? <Loading /> :
        <article className={`${style.Card}`}>
            <abbr title={`${props.click_counter} clics`}>
                <a href={`${props.link}`}>
                    <img src={`/datas/${props.uuid}/cache/${props.picture_title}`} alt={props.title} />
                    <h3>{props.title}</h3>
                </a>
            </abbr>
        </article>
    );
}

export default Card;
