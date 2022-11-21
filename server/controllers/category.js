import Model from "../models/model.js";

/**
 * Verified if category exist
 */
const checkCategory = async (request, response, next, searchValue1, searchValue2, column, table, searchKey1, searchKey2) => {
    const datas = {
        key1: searchValue1,
        key2: searchValue2,
        query: `SELECT ${column} FROM ${table} WHERE ${searchKey1} = ? AND ${searchKey2} = ?`,
    };

    try {
        const result = await Model.getDataByKeys(datas);
        return result[0];
    } catch (error) {
        return next(error);
    }
};

export const addCategory = async (request, response, next) => {
    const { uuid } = request.params;
    const { title } = request.body;

    const categoryDatas = {
        title: title,
        uuid: uuid,
    };

    const query = `INSERT INTO category (title, user_uuid) VALUES (?, ?)`;

    try {
        await Model.saveData(query, categoryDatas);

        response.status(200).json({
            isCreated: true,
        });

    } catch (error) {
        if (process.env.npm_lifecycle_event === "start") {
            error = "We have some connection problems with the database.";
        }
        return next(error);
    }
};

export const removeCategory = async (request, response, next) => {
    const {categoryID, uuid} = request.params;
    const checkDatas = await checkCategory(request, response, next, categoryID, uuid, "id", "category", "id", "user_uuid");

    if (!checkDatas) {
        const error = {
            code: 404,
            message: "Category doesn't exist !",
        };
        return next(error);
    }

    const categoryDatas = {
        key: categoryID,
        query: "DELETE FROM category WHERE id = ?",
    };

    try {
        await Model.removeDataByKey(categoryDatas);
        response.status(200).json({
            isRemoved: true,
        });
    } catch (error) {
        if (process.env.npm_lifecycle_event === "start") {
            error = "We have some connection problems with the database.";
        }
        return next(error);
    }
};

export const allCategory = async (request, response, next) => {

    const {uuid} = request.params;

    const categoryDatas = {
        key: uuid,
        query: "SELECT id AS categoryID, title FROM category WHERE user_uuid = ?",
    };

    try {
        const result = await Model.getDataByKey(categoryDatas);

        if (!result) {
            const error = {
                code: 404,
                message: "No categories existng for this user !",
            };
            return next(error);
        }

        response.status(200).json({
            categoryDatas: result,
            isRetrieved: true,
        });
        return;
    } catch (error) {
        if (process.env.npm_lifecycle_event === "start") {
            error = "We have some connection problems with the database.";
        }
        return next(error);
    }
};

export const updateCategory = async (request, response, next) => {
    const { title } = request.body;
    const { categoryID, uuid } = request.params;

    const checkDatas = await checkCategory(request, response, next, categoryID, uuid, "id", "category", "id", "user_uuid");

    if (!checkDatas) {
        const error = {
            code: 404,
            message: "Category doesn't exist !",
        };
        return next(error);
    }

    const categoryDatas = {
        title: title,
        id: categoryID,
    };

    const query = `UPDATE category SET title = ? WHERE id = ?`;

    try {
        await Model.saveData(query, categoryDatas);

        response.status(200).json({
            isModified: true,
        });
        
    } catch (error) {
        if (process.env.npm_lifecycle_event === "start") {
            error = "We have some connection problems with the database.";
        }
        return next(error);
    }
};
