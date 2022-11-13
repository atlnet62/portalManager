
function Button({ className, isDisabled, onClickHandler, children }) {
    return (
        <button className={className} disabled={isDisabled} onClick={onClickHandler}>
            {children}
        </button>
    );
}

export default Button;
