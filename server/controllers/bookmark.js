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
    const {title, link, picture_title, idCategory } = request.body

    // To check the character allow
    if (password.match(charLogin)) {
        const error = {
            code: 400,
            message: "Character(s) not allowed.",
        };
        return next(error);
    }

    if (password.length > 100) {
        const error = {
            code: 400,
            message: "The character limit is out. please could you verify each field. (password : 100 max)",
        };
        return next(error);
    }

    const bookmarkDatas = {
        title: title,
        link: link,
        picture_title: picture_title,
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
        return next(error);
    }

    try {
        const result = await Model.saveData(queryAddB, bookmarkDatas);

        let linkBookmarkUser = {
            idBookmark: result.insertId,
            idCategory: idCategory === 0 ? null : idCategory,
            user_uuid: uuid,
        };
        
        const queryAddL = `INSERT INTO bookmark_category_link (bookmark_id, category_id, user_uuid, date) VALUES (?,?,?, NOW())`;

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

    const dataPicture = {
        key: bookmarkID,
        query: "SELECT picture_title FROM bookmark WHERE bookmark.id = ?",
    };
    try {
        const result = await Model.getDataByKey(dataPicture);
        const path = `./server/public/datas/${uuid}/cache/${result[0].picture_title}`;
        
        await Model.removeDataByKey(bookmarkDatas);
        
        fs.access(path, (error) => {
            if (!error) {
                fs.unlink(path, (error) => {
                    return next(error);
                })
            }
        });
        
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

export const updateBookmark = async (request, response, next) => {
    const { bookmarkID } = request.params;

const { title, link, click_counter, category_id } = request.body;

    const datasBookmark = {
        title: title,
        link: link,
        click_counter: click_counter,
        key: bookmarkID,
    };
    const queryBookmark = "UPDATE bookmark SET title = ?, link = ?, click_counter = ? WHERE id = ? ";

    const datasLink = {
        category_id: category_id === 0 ? null : category_id,
        key: bookmarkID,
    };

    const queryLink = "UPDATE bookmark_category_link SET category_id = ? WHERE bookmark_id = ?";

    try {
        await Model.saveData(queryBookmark, datasBookmark);
        await Model.saveData(queryLink, datasLink);

        response.status(200).json({
            isModified: true,
        });

    } catch (error) {
        return next(error);
    }
};
