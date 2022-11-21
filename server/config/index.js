// Port export
export const PORT = process.env.PORT || process.env.LOCAL_PORT;

// Config for bdd
export const { DB_HOST, DB_NAME, DB_USER, DB_PWD, DB_PORT } = process.env;

// config for jwt
export const { TOKEN_SECRET } = process.env;

// config for mailling
export const { CLIENTID, CLIENTSECRET, REFRESHTOKEN, ACCESSTOKEN } = process.env;


