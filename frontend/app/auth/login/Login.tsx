"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Login() {
    const [email, setEmail] = useState("");
const router = useRouter();    
    // const [password, setPassword] = useState("");
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({
            email,
            // password,
        });

        try {
            const response = await axios.post(
                "http://localhost:8080/auth/login",
                {
                    email:email,
                    // name:password,
                }
            );
            if(response.data)
            {
                router.push("/verify")
            }
        }
        catch(e:any){
            console.log("error",e);;
        }
    }
    return (
       
        <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>

            <div className="w-full max-w-lg min-h-[550px] rounded-2xl bg-white p-8 shadow-lg">


                <h1 className="text-center text-3xl font-bold text-gray-900">Welcome Back</h1>

                <p className="mt-2 mb-10 text-center text-sm text-gray-500"> Login to your account</p>

                <form onSubmit={handleSubmit} className="mt-18 flex flex-col gap-5">

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Password */}
                    {/* Login button */}
                    <button
                        type="submit"
                        className="mt-5 rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                        Login
                    </button>

                </form> 

                <div className="text-sm mt-5 ">
                    Don't have an account :
                    <a href="signup" className="ml-2 font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
                    SignUp
                    </a>
                </div>
                
                
            </div>
        </div>

    );
}

export default Login
