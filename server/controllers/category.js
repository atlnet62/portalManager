import Model from "../models/model.js";

const charStandard = /[><()[\]{}/'"&~#|`\\^@°=+*¨^$£µ%§,?;:!£¤-]/g;
const charLogin = /[><()[\]{}/\\'"]/g;
const charNumber = /[0-9]/g;

/**
 * Verified if category exist
 */
const checkCategory = async (request, response, next, searchValue, column, table, searchKey) => {
    const categoryDatas = {
        key: searchValue,
        query: `SELECT ${column} FROM ${table} WHERE ${searchKey} = ?`,
    };

    try {
        const categoryDatasResponse = await Model.getDataByKey(categoryDatas);
        return categoryDatasResponse[0];
    } catch (error) {
        return next(error);
    }
};

export const addCategory = async (request, response, next) => {
    const uuid = request.params.uuid;
    const { title } = request.body;

    // To check the character allow
    if (uuid.match(charLogin) || title.match(charStandard)) {
        const error = {
            code: 400,
            message: "Character(s) not allowed.",
        };
        return next(error);
    } 
    
    if (uuid.length > 255 || title.length > 60) {
        const error = {
            code: 400,
            message: "The character limit is out. please could you verify each field. avatar & alias : 60 max, email : 255 max, role, reset, validation : 1 max",
        };
        return next(error);
    }

    const categoryDatas = {
        title: title,
        uuid: uuid,
    };

    const query = `INSERT INTO category (title, user_uuid) VALUES (?, ?)`;

    try {
        const result = await Model.saveData(query, categoryDatas);

        response.status(200).json({
            category_id: result.insertId,
            isCreated: true,
        });
    } catch (error) {
        return next(error);
    }
};

export const removeCategory = async (request, response, next) => {
    const categoryID = request.params.categoryID;

    // To check the character allow
    let checkIdValue = categoryID.match(charNumber);

    if (checkIdValue === null) {
        checkIdValue = '';
    }

    if (checkIdValue.length !== categoryID.length) {
        const error = {
            code: 400,
            message: "Character(s) not allowed.",
        };
        return next(error);
    } if (categoryID.length > 11) {
        const error = {
            code: 400,
            message: "The character limit is out. please could you verify each field. (id : 11 max)",
        };
        return next(error);
    }

    const checkDatas = await checkCategory(request, response, next, categoryID, "id", "category", "id");

    if (!checkDatas) {
        const error = {
            code: 404,
            message: "Category doesn't exist !",
        };
        return next(error);
    }

    const datas = {
        key: categoryID,
        // Modified to delete dates user inside multitable
        query: "DELETE FROM category WHERE id = ?",
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

export const allCategory = async (request, response, next) => {

    const uuid = request.params.uuid;

    // To check the character allow
    if (uuid.match(charLogin)) {
        const error = {
            code: 400,
            message: "Character(s) not allowed.",
        };
        return next(error);
    } 
    
    if (uuid.length > 255) {
        const error = {
            code: 400,
            message: "The character limit is out. please could you verify each field. avatar & alias : 60 max, email : 255 max, role, reset, validation : 1 max",
        };
        return next(error);
    }

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
            category_datas: result,
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

    // To check the character allow
    let checkIdValue = categoryID.match(charNumber);

    if (checkIdValue === null) {
        checkIdValue = '';
    }

    if (checkIdValue.length !== categoryID.length || title.match(charStandard)) {
        const error = {
            code: 400,
            message: "Character(s) not allowed.",
        };
        return next(error);
    } 
    
    if (categoryID.length > 11 || title.length > 60) {
        const error = {
            code: 400,
            message: "The character limit is out. please could you verify each field. (id : 11 max, title : 60 max)",
        };
        return next(error);
    }
    
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

    const dataCategory = {
        title: title,
        id: categoryID,
    };

    const query = `UPDATE category SET title = ? WHERE id = ?`;

    try {
        await Model.saveData(query, dataCategory);

        response.status(200).json({
            isModified: true,
        });
    } catch (error) {
        return next(error);
    }
};
