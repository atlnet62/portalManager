import axios from "axios";

export const getBookmarks = async (token) => {
    try {
        return await axios.get("/api/v1/bookmark/all", {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
};

export const addBookmark = async (token, datas) => {
    try {
        return await axios.post("/api/v1/bookmark/add", datas, {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
}

export const removeBookmark = async (token, id) => {
    try {
        return await axios.delete(`/api/v1/bookmark/remove/${id}`, {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
}

export const updateCounter = async (token, id) => {
    try {
        return await axios.patch(`/api/v1/bookmark/update-counter/${id}`,id, {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
};