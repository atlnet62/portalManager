import axios from "axios";

export const allRole = async (token) => {
    try {
        return await axios.get("/api/v1/role/all", {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
};