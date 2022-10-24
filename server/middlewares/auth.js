import jwt from "jsonwebtoken";

const { TOKEN_SECRET } = process.env;

export const auth = (request, response, next) => {

    const TOKEN = request.headers["x-access-token"];
    if (TOKEN === undefined || TOKEN === "null") {
        response.status(404).json({ msg: "Token not found !" });
        return;
    } else {
        jwt.verify(TOKEN, TOKEN_SECRET, (error, decoded) => {
            if (error) {
                response.status(401).json({ status: 401, msg: "Invalid Token" });
                return;
            } else {
                request.params.uuid = decoded.uuid;
                next();
            }
        });
    }
};
