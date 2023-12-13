"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_automatic_routes_1 = __importDefault(require("express-automatic-routes"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const nconf_1 = __importDefault(require("nconf"));
const body_parser_1 = __importDefault(require("body-parser"));
const response_1 = __importDefault(require("./src/middlewares/response"));
const compression_1 = __importDefault(require("compression"));
const module_alias_1 = __importDefault(require("module-alias"));
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./swagger");
nconf_1.default
    .argv()
    .env()
    .file({ file: "./src/config/" + nconf_1.default.get("NODE_ENV") + ".json" });
console.log("Current environment: " + nconf_1.default.get("NODE_ENV") + "\n\n\n");
const app = (0, express_1.default)(), port = nconf_1.default.get("Port"), swaggerOptions = swagger_1.doc, swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
nconf_1.default.set("STORE", __dirname + nconf_1.default.get("Storage"));
module_alias_1.default.addAliases({
    "@providers": __dirname + "/src/providers",
    "@services": __dirname + "/src/services",
    "@middlewares": __dirname + "/src/middlewares",
    "@models": __dirname + "/src/models",
    "@templates": __dirname + "/src/templates",
});
(0, module_alias_1.default)();
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.static("storage"));
app.use(body_parser_1.default.json({ type: "application/json" }));
app.use(response_1.default);
(0, express_automatic_routes_1.default)(app, { dir: `./src/controllers/`, log: true });
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.listen(port, () => {
    console.log(`⚡️[server]: Server started at port ${port}`);
});
