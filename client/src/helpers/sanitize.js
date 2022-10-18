export const validate = (type, inputs) => {
    if (type === "signin") {
        const inputsSanitized = {
            email: inputs.email.trim(),
            password: inputs.password.trim(),
        };
        return inputsSanitized;
    }

    if (type === "signup") {
        if (
            inputs.email.trim().length < 8 ||
            inputs.password.trim().length < 8
        ) {
            return "8 caractères minimum";
        } else return true;
    }
};
