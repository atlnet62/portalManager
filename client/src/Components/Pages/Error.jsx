function Error(props) {
    return (
        <main id="error">
            <section>
                {props.message !== "" ? <p>{props.message}</p> : <p>General error.</p>}
            </section>
        </main>
    );
}

export default Error;
