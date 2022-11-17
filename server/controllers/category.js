import Model from "../models/model.js";

const charStandard = /[><()[\]{}/'"&~#|`\\^@°=+*¨^$£µ%§,?;:!£¤-]/g;
const charLogin = /[><()[\]{}/\\'"]/g;
const charNumber = /[0-9]/g;

/**
 * Verified if category exist
 */
const checkCategory = async (request, response, next, searchValue, column, table, searchKey) => {
    const datas = {
        key: searchValue,
        query: `SELECT ${column} FROM ${table} WHERE ${searchKey} = ?`,
    };

    try {
        const result = await Model.getDataByKey(datas);
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
        return next(error);
    }
};

export const removeCategory = async (request, response, next) => {
    const {categoryID} = request.params;

    const checkDatas = await checkCategory(request, response, next, categoryID, "id", "category", "id");

    if (!checkDatas) {
        const error = {
            code: 404,
            message: "Category doesn't exist !",
        };
        return next(error);
    }

    const categoryDatas = {
        key: categoryID,
        // Modified to delete dates user inside multitable
        query: "DELETE FROM category WHERE id = ?",
    };

    try {
        await Model.removeDataByKey(categoryDatas);
        response.status(200).json({
            isRemoved: true,
        });
    } catch (error) {
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
        return next(error);
    }
};

export const updateCategory = async (request, response, next) => {
    const { title } = request.body;
    const { categoryID } = request.params;

    const table = "category";
    const column = "id";
    const searchKey = "id";

    const checkDatas = await checkCategory(request, response, next, categoryID, column, table, searchKey);

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
        return next(error);
    }
};
