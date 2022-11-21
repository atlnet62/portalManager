export const sanitize = (request, response, next) => {
    // charcter must be not present in string
    const charForStandard = /[><()[\]{}/'"&~#|`\\^@°=+*¨^$£µ%§,?;:!£¤-]/g;
    const charForHttp = /[><()[ \]{}\\'"]/g;
    const charForLoginAndPicture = /[><() [\]{}/\\'"]/g;

    // categoryID come from params
    // category_id come from body

    const { uuid, categoryID, bookmarkID, userUUID } = request.params;
    const { title, link, picture, category_id, click_counter, email, reset_password, alias, validation_account, avatar, role_id, password } = request.body;

    if (categoryID && isNaN(categoryID)) {
        const error = {
            code: 400,
            message: "Character(s) not allowed.",
        };
        return next(error);
    }
    if (bookmarkID && isNaN(bookmarkID)) {
        const error = {
            code: 400,
            message: "Character(s) not allowed.",
        };
        return next(error);
    }
    if (category_id && isNaN(category_id)) {
        const error = {
            code: 400,
            message: "Character(s) not allowed.",
        };
        return next(error);
    }
    if (click_counter && isNaN(click_counter)) {
        const error = {
            code: 400,
            message: "Character(s) not allowed.",
        };
        return next(error);
    }
    if (reset_password && isNaN(reset_password)) {
        const error = {
            code: 400,
            message: "Character(s) not allowed.",
        };
        return next(error);
    }
    if (validation_account && isNaN(validation_account)) {
        const error = {
            code: 400,
            message: "Character(s) not allowed.",
        };
        return next(error);
    }
    if (role_id && isNaN(role_id)) {
        const error = {
            code: 400,
            message: "Character(s) not allowed.",
        };
        return next(error);
    }

    if (uuid || title || link || picture || email || alias || avatar || password || userUUID) {
        if (
            uuid?.match(charForLoginAndPicture) ||
            userUUID?.match(charForLoginAndPicture) ||
            title?.match(charForStandard) ||
            link?.match(charForHttp) ||
            picture?.match(charForLoginAndPicture) ||
            email?.match(charForLoginAndPicture) ||
            alias?.match(charForStandard) ||
            avatar?.match(charForLoginAndPicture) ||
            password?.match(charForLoginAndPicture)
        ) {
            const error = {
                code: 400,
                message: "Character(s) not allowed.",
            };
            return next(error);
        }
    }

    if (uuid?.length > 255 || userUUID?.length > 255 || title?.length > 60 || picture?.length > 60 || email?.length > 255 || alias?.length > 60 || avatar?.length > 60 || password?.length > 32) {
        const error = {
            code: 400,
            message: "The character limit is out max. please could you verify each field. (uuid, email : 255 max, title, avatar & alias : 60 max, password : 32 max).",
        };
        return next(error);
    }

    if (uuid?.length < 4 || userUUID?.length < 4 || title?.length < 3 || picture?.length < 4 || email?.length < 3 || alias?.length < 3 || avatar?.length < 3 || password?.length < 8) {
        const error = {
            code: 400,
            message: "The character limit is out min. please could you verify each field. (uuid : 4 min, email , title, avatar & alias : 3 min, password : 8 min).",
        };
        return next(error);
    }
    if (
        categoryID?.length > 11 ||
        category_id?.length > 11 ||
        bookmarkID?.length > 11 ||
        click_counter?.length > 6 ||
        role_id?.length > 1 ||
        validation_account?.length > 1 ||
        reset_password?.length > 1
    ) {
        const error = {
            code: 400,
            message: "The character limit is out max. please could you verify each field. (id : 11 max, role, reset, validation : 1 max)",
        };
        return next(error);
    }

    if (
        categoryID?.length < 1 ||
        category_id?.length < 1 ||
        bookmarkID?.length < 1 ||
        click_counter?.length < 1 ||
        role_id?.length < 1 ||
        validation_account?.length < 1 ||
        reset_password?.length < 1
    ) {
        const error = {
            code: 400,
            message: "The character limit is out min. please could you verify each field. (id : 1 min, role, reset, validation : 1 min)",
        };
        return next(error);
    }
    next();
};
