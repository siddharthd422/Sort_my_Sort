"use client";
import { useRouter } from "next/navigation";

function Button(props:any) {
  const router = useRouter();

  const handleClick = () => {
    router.push("auth/login");
  };

  return (
    <div className='mr-25'>
      <button onClick = {handleClick} className=' px-4 py-2 bg-red-600 border-red-650 rounded-full font-bold text-white pointer-cursor'>{props.name}</button>
    </div>
  )
}

export default Button
