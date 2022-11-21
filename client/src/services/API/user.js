import axios from "axios";

export const checkToken = async (token) => {
    try {
        return await axios.get("/api/v1/user/checkToken", {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
};

export const signup = async (datas) => {
    try {
        return await axios.post("/api/v1/user/signup", datas);
    } catch (error) {
        return error.response;
    }
};

export const signin = async (datas) => {
    try {
        return await axios.post("/api/v1/user/signin", datas);
    } catch (error) {
        return error.response;
    }
};

export const allUser = async (token) => {
    try {
        return await axios.get("/api/v1/user/all", {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
};

export const selectUser = async (token, uuid) => {
    try {
        return await axios.get(`/api/v1/user/${uuid}`, {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
};

export const updateUser = async (token, uuid, datas) => {
    try {
        return await axios.patch(`/api/v1/user/update/${uuid}`, datas, {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
};

export const addUser = async (token, datas) => {
    try {
        return await axios.post("/api/v1/user/add", datas, {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
}

export const removeUser = async (token, uuid) => {
    try {
        return await axios.delete(`/api/v1/user/remove/${uuid}`, {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
}

export const resetPasswordUser = async (token, uuid, datas) => {
    try {
        return await axios.patch(`/api/v1/user/reset-password/${uuid}`, datas, {
            headers: { "x-access-token": token },
        });
    } catch (error) {
        return error.response;
    }
}

export const validateAccount = async (datas) => {
    console.log(datas)
    try {
        return await axios.patch(`/api/v1/user/validateAccount/${datas.uuid}`, {datas});
    } catch (error) {
        return error.response;
    }
}

