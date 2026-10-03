"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_service_1 = __importDefault(require("../services/prisma.service"));
const jwt = require('jsonwebtoken');
const authManager = async (req, res, next) => {
    console.log("start");
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            msg: "Authorization token missing",
        });
    }
    try {
        const token = authHeader.split(" ")[1];
        const manager_id = jwt.verify(token, process.env.SECRET);
        const manager = await prisma_service_1.default.manager.findUnique({
            where: {
                id: manager_id.id,
            }
        });
        req.manager = manager;
        // console.log(manager?.email);
    }
    catch (error) {
        return res.status(401).json({
            msg: "Invalid or expired token",
        });
    }
    // console.log(manager_id);
    next();
};
exports.default = authManager;
//# sourceMappingURL=auth.js.map