import nodemailer from "nodemailer";
import { google } from "googleapis";

import { CLIENTID, CLIENTSECRET, REFRESHTOKEN, ACCESSTOKEN } from "../config/index.js";

const OAuth2 = google.auth.OAuth2;

export default (mailTo, subject, title, text, uuid) => {
    // google api setting
    const oauth2Client = new OAuth2(CLIENTID, CLIENTSECRET, "https://developers.google.com/oauthplayground");

    oauth2Client.setCredentials({
        refresh_token: REFRESHTOKEN,
    });

    // google services
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "atlnet62@gmail.com",
            clientId: CLIENTID,
            clientSecret: CLIENTSECRET,
            refreshToken: REFRESHTOKEN,
            accessToken: ACCESSTOKEN,
        },
    });

    // information sender (MAIL) parametrer l'adresse localhost en domain sur production !!
    const mailOptions = {
        from: "<atlnet62@gmail.com>",
        to: mailTo,
        subject: subject,
        text: "",
        html: `<b>${title}</b><p>${text}<p><a href='http://localhost:3000/user/validate-account/${uuid}'>Valider mon compte</a>`,
    };

    // Futur : Replace the console log to reccord that inside the bbd for the traceability log.
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Problem with API Google.");
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
    });
};
