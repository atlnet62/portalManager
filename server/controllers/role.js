import Model from "../models/model.js";

/**
 * Verified if role exist
 */
const checkRole = async (request, response, next, searchValue, column, table, searchKey) => {
    const roleDatas = {
        key: searchValue,
        query: `SELECT ${column} FROM ${table} WHERE ${searchKey} = ?`,
    };

    try {
        const roleDatasResponse = await Model.getDataByKey(roleDatas);
        return roleDatasResponse[0];
    } catch (error) {
        return next(error);
    }
};

export const addRole = async (request, response, next) => {
    const { title } = request.body;

    const checkDatas = await checkRole(request, response, next, "title", "role", "title", title);

    if (checkDatas) {
        const error = {
            code: 404,
            message: "role is already existing !",
        };
        return next(error);
    }

    const roleDatas = {
        title: title,
    };

    const query = `INSERT INTO role (title) VALUES (?)`;

    try {
        const result = await Model.saveData(query, roleDatas);

        response.status(200).json({
            role_id: result.insertId, // envoie un mail avec le password
            isCreated: true,
        });
    } catch (error) {
        return next(error);
    }
};

export const removeRole = async (request, response, next) => {
    const roleID = request.params.roleID;

    const checkDatas = await checkRole(request, response, next, roleID, "id", "role", "id");

    if (!checkDatas) {
        const error = {
            code: 404,
            message: "role doesn't exist !",
        };
        return next(error);
    }

    const datas = {
        key: roleID,
        // Modified to delete dates user inside multitable
        query: "DELETE FROM role WHERE id = ?",
    };

    try {
        await Model.removeDataByKey(datas);
        response.status(200).json({
            isRemoved: true,
        });
    } catch (error) {
        return next(error);
    }
};

export const allRole = async (request, response, next) => {
    const query = "SELECT id AS roleID, title FROM role";

    try {
        const result = await Model.getAllDatas(query);

        if (!result) {
            const error = {
                code: 404,
                message: "No roles existng for this user !",
            };
            return next(error);
        }

        response.status(200).json({
            role_datas: result,
            isRetrieved: true,
        });
        return;
    } catch (error) {
        return next(error);
    }
};

export const updateRole = async (request, response, next) => {
    const { title } = request.body;

    const roleID = request.params.roleID;
    const table = "role";
    const column = "id";
    const searchKey = "id";

    const checkDatas = await checkRole(request, response, next, roleID, column, table, searchKey);

    if (!checkDatas) {
        const error = {
            code: 404,
            message: "Role doesn't exist !",
        };
        return next(error);
    }

    const dataRole = {
        title: title,
        id: roleID,
    };

    const query = `UPDATE role SET title = ? WHERE id = ?`;

    try {
        await Model.saveData(query, dataRole);

        response.status(200).json({
            isModified: true,
        });
    } catch (error) {
        return next(error);
    }
};
