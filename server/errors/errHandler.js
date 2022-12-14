export const errorHandler = (error, request, response, next) => {
    //console.log(error);

    if (!error.errno) {
        response.status(error.code).json({
            errorCode: error.code,
            errorMessage: error.message,
        });
    } else {
        response.status(500).json({
            errorCode: "500",
            errorMessage: "We have some connection problems with the database.",
        });
    }
};
