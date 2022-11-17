export const setCookie = (request, response, next) => {
    const TOKEN = request.headers["x-access-token"];

    response.cookie("uat", TOKEN, { maxAge: 86400000, secure: false });
    response.status(200).json({
        isCreate: true,
    });
};

export const getCookie = (request, response, next) => {
    const { uat } = request.cookies;
    response.status(200).json({
        uat: uat,
        isRetrieved: true
    });
};

export const removeCookie = (request, response, next) => {
    response.clearCookie("uat");
    response.status(200).json({
        isRemove: true,
    });
};
