import Model from "../models/model.js";

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
        if (process.env.npm_lifecycle_event === "start") {
            error = "We have some connection problems with the database.";
        }
        return next(error);
    }
};
