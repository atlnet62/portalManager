// Middleware to verify the role for the user to allow access on each route

export const isAdmin = (request, response, next) => {
    if (request.params.role_id === 3 && request.params.validation_account === 1) {
        next();
    } else {
        response.status(308).json({
            isNotAdmin: "Yes",
        });
    }
};

export const isUser = (request, response, next) => {
    if ((request.params.role_id === 3 || request.params.role_id === 2 || request.params.role_id === 1) && request.params.validation_account === 1) {
        next();
    } else {
        response.status(308).json({
            isNotUser: "Yes",
        });
    }
};
