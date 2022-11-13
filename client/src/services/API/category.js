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

export const removeCategory = async (token, id) => {
    try {
        return await axios.delete(`/api/v1/category/remove/${id}`, {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
}

export const updateCategory = async (token, id, datas) => {
    try {
        return await axios.patch(`/api/v1/category/update/${id}`, datas, {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
};