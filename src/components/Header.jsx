import React from 'react'
import UserIcon from "../assets/svg/UserIcon";


const Header = ({loggedInUserName,userg,setModal,navigate}) => {
  return (
    <header className="h-20 w-full bg-slate-900 px-6 flex justify-between items-center border-b-2 border-gray5 min-w-[299px]">
        <h1 className="text-base text-slate-200 md:text-xl font-style: italic">EVENT matching app </h1>
        <div className="text-base text-slate-200 md:text-xl font-style: italic">Hello, {loggedInUserName}</div>
        <div className="flex flex-col md:flex-row ml-1 ">
            <div>
              {userg ? <img className="h-18 w-18 hidden md:block" src={userg.userg.picture} alt="user image" />
                            :<UserIcon />
                          }
            </div>
            <button
            className="text-sm text-slate px-4 bg-slate-200 rounded-md w-full md:text-lg mb-1 md:mb-0 md:ml-1 md:mr-1"
            onClick={() => setModal(true)} 
            >
            Create
            </button>

            <button
            className="text-sm text-slate px-4 bg-slate-200 rounded-md w-full md:text-lg"
            onClick={() => navigate("/") }
            
            >
            LogOut
            </button>
            
        </div>
      </header>
  )
}

export default Header