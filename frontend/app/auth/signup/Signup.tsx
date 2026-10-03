"use client";
import { useState } from "react";
import axios from "axios";

function Signup() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone,setPhone] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [gst, setGst] = useState("");
    const [account, setAccount] = useState("");
    const [ifsc, setIfsc] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("sending");
        console.log(name ,email,phone,state,city,gst,account,ifsc);

        try{
            const response  = await axios.post(
                "http://localhost:8080/auth/signup",
                {
                    email,
                    name,
                    phone,
                    state,
                    city,
                    gst,
                    accountNumber:account,
                    ifsc,
                    password,
                }
            )
            console.log("sent");
            console.log(name ,email,phone,state,city,gst,account,ifsc);
        }
        catch(e){
            console.log(e);
        }
    }
    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
            <div className="w-full max-w-xl min-h-[550px] m-15 rounded-2xl bg-white p-8 shadow-lg">


                <h1 className="text-center text-3xl font-bold text-gray-900">Welcome To HeavenStay</h1>

                <p className="mt-2 mb-10 text-center text-sm text-gray-500"> Fill the following details to create your account</p>

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

                    {/* name */}
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                            Name
                        </label>

                        <input
                            id="name"
                            type="string"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* phone */}
                    <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                            Phone number
                        </label>

                        <input
                            id="phone"
                            type="string"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* state */}
                    <div>
                        <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-700">
                            State
                        </label>

                        <input
                            id="state"
                            type="string"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="Enter your state"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* city */}
                    <div>
                        <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-700">
                            City
                        </label>

                        <input
                            id="city"
                            type="string"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter your city"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* GST */}
                    <div>
                        <label htmlFor="gst" className="mb-2 block text-sm font-medium text-gray-700">
                            GST number
                        </label>

                        <input
                            id="gst"
                            type="string"
                            value={gst}
                            onChange={(e) => setGst(e.target.value)}
                            placeholder="Enter your gst number"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>


                    {/* Account number */}
                    <div>
                        <label htmlFor="account" className="mb-2 block text-sm font-medium text-gray-700">
                            Account number
                        </label>

                        <input
                            id="account"
                            type="string"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                            placeholder="Enter your Account number"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* ifsc code */}
                    <div>
                        <label htmlFor="ifsc" className="mb-2 block text-sm font-medium text-gray-700">
                            IFSC code
                        </label>

                        <input
                            id="ifsc"
                            type="string"
                            value={ifsc}
                            onChange={(e) => setIfsc(e.target.value)}
                            placeholder="Enter your IFSC code"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* password */}
                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create your password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Login button */}
                    <button
                        type="submit"
                        className="mt-5 rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                        Submit
                    </button>

                </form> 
                
                
            </div>
        </div>
    );
}

export default Signup
