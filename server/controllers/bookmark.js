import Model from "../models/model.js";
import screenshot from "capture-website";
import fs from "fs";


// General format object[datas]

// 1 Table 
// [Table name]Datas = { 
//     ... field bdd : value
//     ... key : value 
//     ... query : value 
//     ...
// }

// multi Tables 
// datas = { 
//     ... field bdd : value
//     ... key : value 
//     ... query : value 
//     ...
// }


/**
 * function to verify if bookmarks exist before add/select/remove/update
 */

const checkBookmark = async (request, response, next, searchValue, column, table, searchKey) => {
    const datas = {
        key: searchValue,
        query: `SELECT ${column} FROM ${table} WHERE ${searchKey} = ?`,
    };

    try {
        const datasResponse = await Model.getDataByKey(datas);
        return datasResponse[0];
    } catch (error) {
        return next(error);
    }
};

export const addBookmark = async (request, response, next) => {
    const { uuid } = request.params;
    const { title, link, picture, idCategory } = request.body;

    // [table]Datas
    const bookmarkDatas = {
        title: title,
        link: link,
        picture_title: picture,
    };

    const queryAddB = `INSERT INTO bookmark (title, link, click_counter, picture_title) VALUES (?,?,0,?)`;

    try {
        await screenshot.file(bookmarkDatas.link, `./server/public/datas/${uuid}/cache/${bookmarkDatas.picture_title}`, {
            x: 0,
            y: 0,
            width: 1280,
            height: 720,
            scaleFactor: 1,
            overwrite: true,
            type: "webp",
        });
    } catch (error) {
        return next(error);
    }

    try {
        const result = await Model.saveData(queryAddB, bookmarkDatas);

        // [table]Datas
        let linkBookmarkUserDatas = {
            bookmark_id: result.insertId,
            category_id: idCategory === 0 ? null : idCategory,
            user_uuid: uuid,
        };

        const queryAddL = `INSERT INTO bookmark_category_link (bookmark_id, category_id, user_uuid, date) VALUES (?,?,?, NOW())`;

        try {
            await Model.saveData(queryAddL, linkBookmarkUserDatas);
            response.status(200).json({
                isCreated: true,
            });

        } catch (error) {
            return next(error);
        }

    } catch (error) {
        return next(error);
    }
};

export const allBookmark = async (request, response, next) => {
    const { uuid } = request.params;

    // [table]Datas
    const bookmarkDatas = {
        key: uuid,
        query: "SELECT bookmark_id, category_id, title, link, click_counter, picture_title FROM bookmark_category_link JOIN bookmark ON bookmark_id = bookmark.id WHERE user_uuid = ? ORDER BY click_counter DESC",
    };

    try {
        const result = await Model.getDataByKey(bookmarkDatas);
        if (!result) {
            const error = {
                code: 404,
                message: "No bookmarks existng for this user !",
            };
            return next(error);
        }

        response.status(200).json({
            bookmarkDatas: result,
            isRetrieved: true,
        });
        return;
    } catch (error) {
        return next(error);
    }
};

export const removeBookmark = async (request, response, next) => {
    const { bookmarkID } = request.params;
    const { uuid } = request.params;

    const checkDatas = await checkBookmark(request, response, next, bookmarkID, "id", "bookmark", "id");

    if (!checkDatas) {
        const error = {
            code: 404,
            message: "Bookmark doesn't exist !",
        };
        return next(error);
    }

    const bookmarkDatas = {
        key: bookmarkID,
        query: "DELETE FROM bookmark WHERE id = ?",
    };

    const pictureDatas = {
        key: bookmarkID,
        query: "SELECT picture_title FROM bookmark WHERE bookmark.id = ?",
    };
    try {
        const result = await Model.getDataByKey(pictureDatas);
        const path = `./server/public/datas/${uuid}/cache/${result[0].picture_title}`;

        await Model.removeDataByKey(bookmarkDatas);

        fs.access(path, (error) => {
            if (!error) {
                fs.unlink(path, (error) => {
                    return next(error);
                });
            }
        });

        response.status(200).json({
            isRemoved: true,
        });
    } catch (error) {
        return next(error);
    }
};

export const updateCounter = async (request, response, next) => {
    const { bookmarkID, uuid } = request.params;

    const datas = {
        key1: bookmarkID,
        key2: uuid,
        query: "SELECT click_counter FROM bookmark JOIN bookmark_category_link ON bookmark_category_link.bookmark_id = bookmark.id WHERE bookmark.id = ? AND bookmark_category_link.user_uuid = ?",
    };

    try {
        const result = await Model.getDataByKeys(datas);

        if (!result[0]) {
            const error = {
                code: 404,
                message: "Bookmark doesn't exist !",
            };
            return next(error);
        }

        let newCounter = result[0].click_counter;
        newCounter++;

        const bookmarkDatas = {
            click_counter: newCounter,
            idBookmark: bookmarkID,
        };

        const query = `UPDATE bookmark SET click_counter = ? WHERE id = ?`;

        try {
            await Model.saveData(query, bookmarkDatas);

            response.status(200).json({
                isModified: true,
            });
        } catch (error) {
            return next(error);
        }

        return;
    } catch (error) {
        return next(error);
    }
};

export const updateBookmark = async (request, response, next) => {
    const { bookmarkID } = request.params;
    const { title, link, click_counter, category_id } = request.body;

    const bookmarkDatas = {
        title: title,
        link: link,
        click_counter: click_counter,
        key: bookmarkID,
    };
    const queryBookmark = "UPDATE bookmark SET title = ?, link = ?, click_counter = ? WHERE id = ? ";

    const linkBookmarkUserDatas = {
        category_id: category_id === 0 ? null : category_id,
        key: bookmarkID,
    };

    const queryLink = "UPDATE bookmark_category_link SET category_id = ? WHERE bookmark_id = ?";

    try {
        await Model.saveData(queryBookmark, bookmarkDatas);
        await Model.saveData(queryLink, linkBookmarkUserDatas);

        response.status(200).json({
            isModified: true,
        });
    } catch (error) {
        return next(error);
    }
};
