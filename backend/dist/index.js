"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const auth_1 = require("./routes/auth");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
//@ts-ignore
const client = new redis_1.createClient();
exports.client = client;
app.use("/auth", auth_1.router);
app.get("/", (req, res) => {
    // console.log("API KEY:", process.env.RESEND_API_KEY);
    res.status(400).json({ msg: "working fine" });
});
async function starter() {
    await client.on("error", (err) => console.log("Redis Client Error", err)).connect();
    app.listen(8080, () => {
        console.log("server  is running successfully");
    });
}
starter();
//# sourceMappingURL=index.js.map