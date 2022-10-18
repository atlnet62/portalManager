function Error(props) {
    return (
        <main id="error">
            {props.message !== "" ? <p>{props.message}</p> : <p>Error Message !</p>}
        </main>
    );
}

export default Error;
