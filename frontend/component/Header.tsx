import IconName from "./IconName"
import Button from "./Button"
function Header() {
  return (
    <div className="
        absolute top-4 left-1/2 -translate-x-1/2 z-20
        w-[92%] max-w-6xl h-20 px-6
        flex items-center justify-between
        rounded-2xl
        bg-white/10 backdrop-blur-lg backdrop-saturate-150
        border border-white/30
        shadow-lg shadow-black/20
      ">
        <IconName/>
        <Button name='Login'/>

      {/* <h1 className='px-3'>This is the header</h1> */}
    </div>
  )
}

export default Header
