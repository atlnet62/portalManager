
export const setCookies = (request, response, next) => {
    const TOKEN = request.headers["x-access-token"];
    console.log(request.headers);
    //response.cookie("uat", TOKEN, {expire: 15552000});
}