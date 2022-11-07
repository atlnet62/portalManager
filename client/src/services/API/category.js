import axios from "axios";

export const allCategory = async (token) => {
    try {
        return await axios.get("/api/v1/category/all", {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
};

export const addCategory = async (token, datas) => {
    try {
        return await axios.post("/api/v1/category/add", datas, {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
}