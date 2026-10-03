import React from 'react'

function Image() {
    return (
        <div>
            <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('/main_img.jpg')" }}>

                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 flex h-full items-center">
                    <div className="ml-10 max-w-lg text-white">

                        <p className="mb-3 text-sm font-semibold uppercase">
                            Become a host
                        </p>
                        <h1 className="text-5xl font-bold leading-tight">
                            Host your space,
                            <br />
                            share your world
                        </h1>

                        <p className="mt-4 max-w-md text-sm leading-6">
                            The art of hosting is rooted in thoughtful design.
                            Share your unique aesthetic with guests and earn
                            extra income on a schedule that works for you.
                        </p>

                        <button className="mt-6 rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700">
                            Try hosting
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Image
