import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

// infos à obtenir sur le "https://developers.google.com/oauthplayground" et le console cloud plateform
const clientId =
    "561962943621-d5obedrpic7u1ngi37lptrk8704iqn70.apps.googleusercontent.com";
const clientSecret = "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";
const refreshToken =
    "1//04J749-IrGZszCgYIARAAGAQSNwF-L9IrQm6JbxJdJgzuA0IJWbvN_73dUPjlmO6KMhhAP0RXK_86AOB6fIF9hPAyXNGg1VfHt74";
const accessToken =
    "ya29.a0Aa4xrXMTctiLZTScJnaBo3UJwaFy8tSuPZFrS58qiYd-VJ_Ijpz_vgaDm4BLghZ9Z1euWw4opfXvHxRMRURjs2s1UPGnPuj0H9TqHtrq9IyojR83--VZQ94z2JmAmUlZ76QGy3ZD7wPhvxdA91obU8UiqHpvaCgYKATASARASFQEjDvL9Zjy_-HqU757j_oCd47B13w0163";

// export de ce fichier sous une fonction anonyme, cette fonction sera appelé dans la fonction controller "create" juste aprés son enregistrement dans la
export default (mailTo, subject, title, text, uuid) => {
    const oauth2Client = new OAuth2(
        clientId,
        clientSecret,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: refreshToken,
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "atlnet62@gmail.com", // le mail de l'user autorisé sur la plateforme google cloud
            clientId: clientId, // client Id
            clientSecret: clientSecret, // client secret
            refreshToken: refreshToken,
            accessToken: accessToken,
        },
    });

    const mailOptions = {
        from: "<atlnet62@gmail.com>", // sender address
        to: mailTo, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: `<b>${title}</b><p>${text}<p><a href='http://localhost:3000/entry/validateaccount/${uuid}'>Valider mon compte</a>`, // qui sera un lien dans le mail qui emmènera l'user qui a cliqué dessus sur votre front, un composant qui s'occupera d'effectuer une requete vers une route de votre api-back, celle-ci mettra à jour une valeur lié au champ de l'user dans la bdd, exemple : isAccountValidated -> "yes", maintenant l'enregistrement de l'user sera complet et pourra accéder aux routes "protégées"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("ça rate");
            return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
    });
};
