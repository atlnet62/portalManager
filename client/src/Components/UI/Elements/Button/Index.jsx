
function Button({ isDisabled, onClickHandler, children }) {
    return (
        <button disabled={isDisabled} onClick={onClickHandler}>
            {children}
        </button>
    );
}

export default Button;
