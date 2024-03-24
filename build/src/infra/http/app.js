"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const v1_1 = require("./api/v1");
const db_1 = require("../db");
const configuration_1 = require("../../config/configuration");
const app = (0, express_1.default)();
exports.app = app;
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTION",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
const origin = {
    origin: configuration_1.Config.isProduction || configuration_1.Config.isStaginig ? "https://" : "*",
};
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("yo i'm up");
});
app.use("/api/v1", v1_1.v1Router);
// initialize db
db_1.dataService
    .initialize()
    .then(() => {
    console.log("Db💾 connected...");
    app.listen(configuration_1.Config.PORT || 400, () => {
        console.log(`[App]: Server listening on ${configuration_1.Config.PORT}`);
    });
})
    .catch((err) => {
    console.log(err.message);
});
process.on("SIGINT", () => {
    db_1.dataService.destroy();
    // Gracefully exit the process
    process.exit(0);
});
//# sourceMappingURL=app.js.map