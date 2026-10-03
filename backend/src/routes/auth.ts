import * as z from "zod"; 
import { Router } from 'express';
import {client} from "../index";
import { sendotp } from "../services/sendotp";
import prisma from "../services/prisma.service"
import authManager from '../middleware/auth.js';
export const router = Router();

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
router.post("/signup",async (req , res) => {
    console.log("request recieved");
    try{
        
        const parsed = await signupSchema.safeParse(req.body);

        if(!parsed.success)
        {
            return res.json({
                msg: "problem in parsing"
            });
        }

        const {name ,email,phone,state,city,gst,accountNumber,ifsc} = parsed.data;

        // checking whether the person is already registered or not
        const existingManager = await prisma.manager.findUnique({
            where : {
                email
            }
        })

        if(existingManager)
        {
            return res.json({
                msg:"Already registerd"
            })
        }

        // store it in the data base 
        console.log(name ,email,phone,state,city,gst,accountNumber,ifsc);

        const  data = await prisma.manager.create({
            data:{
                name,
                email,
                phone,
                state,
                city,
                gst,
                accountNumber,
                ifsc
            }
        })

        console.log(data);

        const token = jwt.sign({id : data.id}, process.env.SECRET, { expiresIn: '7d'});


       return res.status(200).json({
            msg: "Signup successful",
            data: 
                token
        });
    }
    catch(e){
        console.log(e);
        return res.json({
            msg: "there is some error in parsing",
        });
    }
});

router.post("/login",async (req,res) => {
    try{
        const parsed = loginSchema.safeParse(req.body);

        if(!parsed.success)
        {
            return res.json({
                msg:"invalid fields"
            })
        }

        const {name ,email} = req.body;
    

        // send otp
        console.log("sending otp");
        sendotp(email);
        console.log("otp sent sucessfully");

        const data = await prisma.manager.findUnique({
            where :{
                email,
            }
        })

        if(!data)
        {
            return res.json({
                msg:"User doesn't exit, Register first"
            })
        }

        const token = jwt.sign({id : data.id}, process.env.SECRET, { expiresIn: '7d'});


       return res.status(200).json({
            msg: "login successful",
            data: 
                token
        });


        
    }
    catch(e){
        console.log(e);
        return res.json({
            msg: "there is some error in login",
        });
    }
});


router.post("/verify", async(req,res) => {

    try{
        const parsed = await otpSchema.safeParse(req.body);

        if(!parsed.success)
        {
            return res.json({
                msg:"invalid request!"
            })
        }

        const { email, otp} = parsed.data;

        // compare orignalotp and the reseived otp
        const storedotp = await client.get(`email:${email}`);

        if (!storedotp) {
        return res.status(400).json({
            msg: "OTP expired or not found"
        });
        }

        if(otp != storedotp) return res.json({msg : "invalid otp"})

        

        const token = jwt.sign(
            {email},
            process.env.SECRET,
            {expiresIn:'7d'}
        )

        return res.json({
            msg:"login Sucessfull",
            data:{
                token
            }
        })
        
    }
    catch(e){
        return res.json({
            msg:"some error occured",
        });
    }
});


router.post("/testauth",authManager,(req,res) =>{
    return res.json({msg : "route working properly"})
})
