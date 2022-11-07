import Model from "../models/model.js";
import screenshot from "capture-website";
import fs from "fs";

/**
 * Verified if category exist
 */
const checkBookmark = async (request, response, next, searchValue, column, table, searchKey) => {
    const bookmarkDatas = {
        key: searchValue,
        query: `SELECT ${column} FROM ${table} WHERE ${searchKey} = ?`,
    };

    try {
        const bookmarkDatasResponse = await Model.getDataByKey(bookmarkDatas);
        return bookmarkDatasResponse[0];
    } catch (error) {
        return next(error);
    }
};

export const addBookmark = async (request, response, next) => {
    const uuid = request.params.uuid;

    const bookmarkDatas = {
        title: request.body.title,
        link: request.body.link,
        picture_title: request.body.picture_title,
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
            type: 'webp',
        });
    } catch (error) {
        console.log(error);
    }

    try {
        const resultBookmark = await Model.saveData(queryAddB, bookmarkDatas);

        let linkBookmarkUser = {
            idBookmark: resultBookmark.insertId,
            idCategory: request.body.idCategory,
            user_uuid: uuid,
        };

        let queryAddL = null;

        if (linkBookmarkUser.idCategory === "") {
            linkBookmarkUser = {
                idBookmark: resultBookmark.insertId,
                user_uuid: uuid,
            };
            queryAddL = `INSERT INTO bookmark_category_link (bookmark_id, user_uuid, date) VALUES (?, ?, NOW())`;
        } else {
            queryAddL = `INSERT INTO bookmark_category_link (bookmark_id, category_id, user_uuid, date) VALUES (?,?,?, NOW())`;
        }

        try {
            await Model.saveData(queryAddL, linkBookmarkUser);
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
    const bookmarkDatas = {
        key: request.params.uuid,
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
            bookmark_datas: result,
            isRetrieved: true,
        });
        return;
    } catch (error) {
        return next(error);
    }
};

export const removeBookmark = async (request, response, next) => {
    const bookmarkID = request.params.bookmarkID;
    const { uuid } = request.params

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

    const linkDatas = {
        key: bookmarkID,
        query: "DELETE FROM bookmark_category_link WHERE bookmark_id = ?",
    };

    const dataPicture = {
        key: bookmarkID,
        query: "SELECT picture_title FROM bookmark WHERE bookmark.id = ?",
    };
    try {
        const result = await Model.getDataByKey(dataPicture);
        const path = `./server/public/datas/${uuid}/cache/${result[0].picture_title}`;
        
        await Model.removeDataByKey(linkDatas);
        await Model.removeDataByKey(bookmarkDatas);
        
        fs.unlink(path, (error) => {
            return next(error);
        })
        
        response.status(200).json({
            isRemoved: true,
        });
    } catch (error) {
        return next(error);
    }
};

export const selectBookmark = async (request, response, next) => {
    const { bookmarkID, uuid } = request.params;

    const datas = {
        key1: bookmarkID,
        key2: uuid,
        query: "SELECT bookmark.id AS bookmark_id, bookmark.title, link, click_counter, picture_title, category.title AS category_title FROM bookmark JOIN bookmark_category_link ON bookmark_category_link.bookmark_id = bookmark.id LEFT OUTER JOIN category ON bookmark_category_link.category_id = category.id WHERE bookmark.id = ? AND bookmark_category_link.user_uuid = ?",
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

        response.status(200).json({
            bookmarkDatas: result[0],
            isRetrieved: true,
        });
        return;
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
        const updateDatas = {
            click_counter: newCounter,
            idBookmark: bookmarkID,
        };

        const query = `UPDATE bookmark SET click_counter = ? WHERE id = ?`;

        try {
            await Model.saveData(query, updateDatas);

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
