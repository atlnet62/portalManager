import style from "./style.module.css";

function Button({ isDisabled, loadStyle, onClickHandler, children }) {
    return (
        <button
            className={`${
                loadStyle === style.btn
            }`}
            disabled={isDisabled}
            onClick={onClickHandler}
        >
            {children}
        </button>
    );
}

export default Button;