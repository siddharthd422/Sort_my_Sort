import prisma from "../services/prisma.service";

const jwt = require('jsonwebtoken');

const authManager = async (req:any,res:any,next:any) =>{
    console.log("start");

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
        return res.status(401).json({
            msg:"Authorization token missing",
        });
    }

    try{

        const token = authHeader.split(" ")[1];

        const manager_id = jwt.verify(
            token,
            process.env.SECRET!
        )
        
        const manager = await prisma.manager.findUnique({
            where :{
                id:manager_id.id,
            }
        })

        req.manager = manager;

        // console.log(manager?.email);
    } catch (error) {
        return res.status(401).json({
            msg: "Invalid or expired token",
        });
    }

    // console.log(manager_id);

    next();
};


export default authManager;