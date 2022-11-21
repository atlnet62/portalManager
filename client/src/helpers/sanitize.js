export const validate = (type, datasToVerify) => {

    const charStandard = /[><()[\]{}/'"&~#|`\\^@°=+*¨^$£µ%§,?;:!£¤-]/g;
    const charHttp = /[><()[\]{}\\'"]/g;
    const charLogin = /[><()[\]{}/\\'"]/g;

    if (type === "signin") {

        if (datasToVerify.password.match(charLogin) || datasToVerify.email.match(charLogin)) {
            return `Characters aren't allowed - Character not allowed : ><()[]{}/\\'"`;
        } 
        
        if (datasToVerify.email?.trim().length < 8 || datasToVerify.password?.trim().length < 8) {
            return "8 characters minimum";
        } else return true;
    }


    if (type === "signup" || type === "user-add" || type === "user-update") {
        if (datasToVerify.password?.match(charLogin) || datasToVerify.email?.match(charLogin)) {
            return `Characters aren't allowed - Character not allowed : ><()[]{}/\\'"`;
        }

        if (datasToVerify.email?.trim().length < 8 || datasToVerify.password?.trim().length < 8) {
            return "8 characters minimum";
        } else return true;
    }


    if (type === "reset-password") {
        if (datasToVerify.password.match(charLogin) || datasToVerify.passwordVerified.match(charLogin)) {
            return `Characters aren't allowed - Character not allowed : ><()[]{}/\\'"`;
        }

        if (datasToVerify.password !== datasToVerify.passwordVerified) {
            return "The 2 passwords are différent ! please could you re-type the same password inside both field.";
        } else return true;
    }


    if (type === "alias" || type === "category") {
        if (datasToVerify.alias?.match(charStandard) || datasToVerify.title?.match(charStandard) ) {
            return `Special characters not allowed`;
        } 
        
        if (datasToVerify.alias?.trim().length < 3 || datasToVerify.title?.trim().length < 3) {
            return "3 characters minimum";
        } else return true;
    }

    if (type === "bookmark") {
        if (datasToVerify.title.match(charStandard)) {
            return `Special characters not allowed`;
        }
        if (datasToVerify.link.match(charHttp)) {
            return `Characters aren't allowed - Character not allowed : ><()[]{}\\'"`;
        }

        if (datasToVerify.title.trim().length < 3 || datasToVerify.link.trim().length < 3) {
            return "3 characters minimum";
        } else return true;
    }
};
