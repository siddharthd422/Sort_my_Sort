"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"



export default function verify(){
 const [otp , setOtp] = useState("")
 const router= useRouter();
 async function call(e : any){e.preventDefault(); const resp = await axios.post("http://localhost:8080/auth/verify" , {otp : otp , email : "siddharth734t@gmail.com"}) ; 
console.log(resp)
if(resp.data.msg == "login Sucessfull"){
    localStorage.setItem("token" , resp.data.data.token)
    router.push("/dashboard")
}}


 return <div>
        <input type="text" placeholder="otp" onChange={(e) =>{
            setOtp(e.target.value)
        }} />
        <button onClick={call}>Vwerify</button>
    </div>
}