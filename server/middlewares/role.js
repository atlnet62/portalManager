export const isAdmin = (request, response, next) => {
    if (request.params.role_id === 3) {
        next();
    } else {
        response.status(308).json({
            isNotAdmin: "Yes",
        });
    }
};

export const isUser = (request, response, next) => {
    if (request.params.role_id === 3 || request.params.role_id === 2 || request.params.role_id === 1) {
        next();
    } else {
        response.status(308).json({
            isNotUser: "Yes",
        });
    }
};
