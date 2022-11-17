import axios from "axios";

export const setCookie = async (token) => {
    try {
        return await axios.get("/api/v1/cookie/add", {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
};