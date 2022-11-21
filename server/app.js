import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import fileUpload from "express-fileupload";
import "dotenv/config";
import { PORT } from "./config/index.js";
import router from "./router/index.routes.js";
import { errorHandler } from "./errors/errHandler.js";
console.log(process.env.npm_lifecycle_event);

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

app.use(router);
app.use(errorHandler);

/**********
 **    app.get("*", (request, response) => {
 **        res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
 **    });
 **********/

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});