import Model from "../models/model.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// import mailing from '../config/mailing.js';

const { TOKEN_SECRET } = process.env;
const saltRounds = 10;

/**
 * Verified if user exist
 */
const checkUser = async (request, response, next, searchValue, column, table, searchKey) => {
    const userDatas = {
        key: searchValue,
        query: `SELECT ${column} FROM ${table} WHERE ${searchKey} = ?`,
    };
    try {
        const userDatasResponse = await Model.getDataByKey(userDatas);

        return userDatasResponse[0];
    } catch (error) {
        return next(error);
    }
};

/**
 * Modified user datas
 */

export const updateUser = async (request, response, next) => {
    const { email, reset_password, alias, validation_account, avatar, role_id } = request.body;

    const uuid = request.params.uuid;
    const table = "user";
    const column = "email";
    const searchKey = "uuid";

    const checkUserDatas = await checkUser(request, response, next, uuid, column, table, searchKey);

    if (!checkUserDatas) {
        const error = {
            code: 404,
            message: "User doesn't exist !",
        };
        return next(error);
    }

    const dataUser = {
        email: email,
        reset_password: reset_password,
        alias: alias,
        validation_account: validation_account,
        avatar: avatar,
        role_id: role_id,
        uuid: uuid,
    };

    const query = `UPDATE user SET email = ?, reset_password = ?, alias = ?, validation_account = ?, avatar = ?, role_id = ? WHERE uuid = ?`;

    try {
        await Model.saveData(query, dataUser);

        response.status(200).json({
            isModified: true,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Delete all user data
 */

export const removeUser = async (request, response, next) => {
    const uuid = request.params.uuid;
    const table = "user";
    const column = "email";
    const searchKey = "uuid";

    const checkUserDatas = await checkUser(request, response, next, uuid, column, table, searchKey);

    if (!checkUserDatas) {
        const error = {
            code: 404,
            message: "User doesn't exist !",
        };
        return next(error);
    }

    const datas = {
        key: uuid,
        // Modified to delete dates user inside multitable
        query: "DELETE FROM user WHERE uuid = ?",
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

/**
 * Reset password tools
 */

export const resetPassword = async (request, response, next) => {
    const { password, reset } = request.body;
    const uuid = request.params.uuid;

    const checkUserDatas = await checkUser(request, response, next, uuid, "email", "user", "uuid");

    if (!checkUserDatas) {
        const error = {
            code: 404,
            message: "User doesn't exist !",
        };
        return next(error);
    }

    try {
        bcrypt.hash(password, saltRounds, async (error, hash) => {
            const dataUser = {
                password: hash,
                resetPassword: reset,
                uuid: uuid,
            };
            const query = "UPDATE user SET password = ?, reset_password = ? WHERE uuid = ?";

            try {
                await Model.saveData(query, dataUser);

                response.status(200).json({
                    isModified: true,
                });
            } catch (error) {
                return next(error);
            }
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Add a user inside with a temp password
 */

export const addUser = async (request, response, next) => {
    const { email } = request.body;

    const checkUserDatas = await checkUser(request, response, next, email, "email", "user", "email");

    if (checkUserDatas) {
        const error = {
            code: 409,
            message: "Email is already existing, impossible to create a user with this email.",
        };
        return next(error);
    }

    try {
        const password = Math.random().toString(36).replace("0.", "");

        bcrypt.hash(password, saltRounds, async (error, hash) => {
            const dataUser = {
                uuid: uuidv4(),
                email: email,
                password: hash,
            };

            const query =
                "INSERT INTO user (uuid, email, password, reset_password, alias, role_id, validation_account, register_date, avatar) VALUES ( ?, ?, ?, 1, NULL, 1, 0, now(), 'avatarDefault.png')";

            try {
                const result = await Model.saveData(query, dataUser);

                //mailing(email, "Account Validation", "Welcome on board", "Please, Could you click on the button bellow : ", dataUser.uuid);

                response.status(200).json({
                    tempPassword: password, // envoie un mail avec le password
                    isCreated: true,
                });
            } catch (error) {
                return next(error);
            }
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Select a specific user - doesn't exist !
 */

export const selectUser = async (request, response, next) => {
    const userDatas = {
        key: request.params.uuid,
        query: "SELECT user.id AS user_id, uuid, email, reset_password, alias, validation_account, register_date, avatar, role.id AS role_id, role.title AS user_role FROM user JOIN role ON role_id = role.id WHERE uuid = ?",
    };

    try {
        const result = await Model.getDataByKey(userDatas);

        if (!result[0]) {
            const error = {
                code: 404,
                message: "User doesn't exist !",
            };
            return next(error);
        }

        response.status(200).json({
            userDatas: result[0],
            isRetrieved: true,
        });
        return;
    } catch (error) {
        return next(error);
    }
};

/**
 * Check list user
 */

export const allUser = async (request, response, next) => {
    const query =
        "SELECT user.id AS user_id, uuid, email, reset_password, alias, validation_account, register_date, avatar, role.id AS role_id, role.title AS user_role FROM user JOIN role ON role_id = role.id";

    try {
        const result = await Model.getAllDatas(query);

        if (result.length < 0) {
            const error = {
                code: 404,
                message: "User doesn't exist !",
            };
            return next(error);
        }

        response.status(200).json({
            usersDatas: result,
            nbUsers: result.length,
            isRetrieved: true,
        });
        return;
    } catch (error) {
        return next(error);
    }
};

/**
 * Login if exist !
 */

export const signin = async (request, response, next) => {
    const { email, password } = request.body;

    const userDatas = {
        key: email,
        query: "SELECT email, password FROM user WHERE email = ?",
    };

    try {
        const result = await Model.getDataByKey(userDatas);
        const isSamePwd = result[0] ? await bcrypt.compare(password, result[0].password) : null;

        if (!result[0] || !isSamePwd) {
            response.status(404).json({
                msg: "Bad Login or/and Password",
            });
            return;
        }
        const TOKEN = jwt.sign({ uuid: result[0].uuid, role_id: result[0].role_id }, TOKEN_SECRET);

        response.status(200).json({
            token: TOKEN,
            isLogged: true,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * create a user if email doesn't exist !
 */

export const signup = async (request, response, next) => {
    const { email, password } = request.body;

    const checkUserDatas = await checkUser(request, response, next, email, "email", "user", "email");

    if (checkUserDatas) {
        const error = {
            code: 409,
            message: "Email is already existing, impossible to create a user with this email.",
        };
        return next(error);
    }

    try {
        bcrypt.hash(password, saltRounds, async (error, hash) => {
            const dataUser = {
                uuid: uuidv4(),
                email: email,
                password: hash,
            };

            const query =
                "INSERT INTO user (uuid, email, password, reset_password, alias, role_id, validation_account, register_date, avatar) VALUES ( ?, ?, ?, 0, NULL, 1, 0, now(), 'avatarDefault.png')";

            try {
                await Model.saveData(query, dataUser);

                //mailing(email, "Account Validation", "Welcome on board", "Please, Could you click on the button bellow : ", dataUser.uuid);

                response.status(200).json({
                    userIsCreated: true,
                });
            } catch (error) {
                return next(error);
            }
        });
    } catch (error) {
        return next(error);
    }
};
