import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function Content() {
  return (
    <div className="flex justify-center items-center">
      <div className="p-20 font-bold bg-red-650">
        <h1 className="text-5xl">Your next chapter, made possible by Host<span className={`${dancingScript.className} font-semibold text-15xl`}>ing</span> </h1>
      </div>

      <div className="p-20 br-blue-900">
            <h5 className="text-2xl py-5 font-semibold">Share what you love</h5>
            <p className="text-black/65">Indulge your love for design when you host for HeavenStay guest, who are drawn to authentic travel in creatively curated places</p>
      </div>

      <div className="p-20">
        <h5 className="text-2xl py-5 font-semibold">Host how you want to</h5>
        <p className="text-black/65"> HeavenStay give you  the tools and support to earn extra income, be your own boss and invest i your passions</p>
      </div>
    </div>
  )
}

export default Content
