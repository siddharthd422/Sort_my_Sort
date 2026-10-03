"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const z = __importStar(require("zod"));
const express_1 = require("express");
const index_1 = require("../index");
const sendotp_1 = require("../services/sendotp");
const prisma_service_1 = __importDefault(require("../services/prisma.service"));
const auth_js_1 = __importDefault(require("../middleware/auth.js"));
exports.router = (0, express_1.Router)();
const jwt = require('jsonwebtoken');
const loginSchema = z.object({
    email: z.email(),
});
const otpSchema = z.object({
    email: z.email(),
    otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});
const signupSchema = z.object({
    name: z.string().min(1).max(20),
    email: z.email(),
    phone: z.string().min(10).max(10),
    state: z.string(),
    city: z.string(),
    gst: z.string(),
    accountNumber: z.string(),
    ifsc: z.string(),
});
console.log("AUTH ROUTER LOADED");
exports.router.post("/signup", async (req, res) => {
    console.log("request recieved");
    try {
        const parsed = await signupSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.json({
                msg: "problem in parsing"
            });
        }
        const { name, email, phone, state, city, gst, accountNumber, ifsc } = parsed.data;
        // checking whether the person is already registered or not
        const existingManager = await prisma_service_1.default.manager.findUnique({
            where: {
                email
            }
        });
        if (existingManager) {
            return res.json({
                msg: "Already registerd"
            });
        }
        // store it in the data base 
        console.log(name, email, phone, state, city, gst, accountNumber, ifsc);
        const data = await prisma_service_1.default.manager.create({
            data: {
                name,
                email,
                phone,
                state,
                city,
                gst,
                accountNumber,
                ifsc
            }
        });
        console.log(data);
        const token = jwt.sign({ id: data.id }, process.env.SECRET, { expiresIn: '7d' });
        return res.status(200).json({
            msg: "Signup successful",
            data: token
        });
    }
    catch (e) {
        console.log(e);
        return res.json({
            msg: "there is some error in parsing",
        });
    }
});
exports.router.post("/login", async (req, res) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.json({
                msg: "invalid fields"
            });
        }
        const { name, email } = req.body;
        // send otp
        console.log("sending otp");
        (0, sendotp_1.sendotp)(email);
        console.log("otp sent sucessfully");
        const data = await prisma_service_1.default.manager.findUnique({
            where: {
                email,
            }
        });
        if (!data) {
            return res.json({
                msg: "User doesn't exit, Register first"
            });
        }
        const token = jwt.sign({ id: data.id }, process.env.SECRET, { expiresIn: '7d' });
        return res.status(200).json({
            msg: "login successful",
            data: token
        });
    }
    catch (e) {
        console.log(e);
        return res.json({
            msg: "there is some error in login",
        });
    }
});
exports.router.post("/verify", async (req, res) => {
    try {
        const parsed = await otpSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.json({
                msg: "invalid request!"
            });
        }
        const { email, otp } = parsed.data;
        // compare orignalotp and the reseived otp
        const storedotp = await index_1.client.get(`email:${email}`);
        if (!storedotp) {
            return res.status(400).json({
                msg: "OTP expired or not found"
            });
        }
        if (otp != storedotp)
            return res.json({ msg: "invalid otp" });
        const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '7d' });
        return res.json({
            msg: "login Sucessfull",
            data: {
                token
            }
        });
    }
    catch (e) {
        return res.json({
            msg: "some error occured",
        });
    }
});
exports.router.post("/testauth", auth_js_1.default, (req, res) => {
    return res.json({ msg: "route working properly" });
});
//# sourceMappingURL=auth.js.map