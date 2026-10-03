"use client"
import { useRouter } from "next/navigation";

function IconName() {
  const router = useRouter();
  return (
    <div className='bg-red-600 ml-25 border border-red-600 rounded-full '>
      <button className= 'text-red-900 px-4 py-2 rounded text-white font-bold' onClick={(e)=>{
        e.preventDefault();
        router.push("/")
      }} >Sort My Stay</button>
    </div>
  )
}

export default IconName
