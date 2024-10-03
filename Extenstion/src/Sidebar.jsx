import React, { useState } from 'react';

const Sidebar = ({activeTab, setActiveTab, isList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className='p-3'>
      {/* Sidebar overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 z-40 w-full h-full bg-black opacity-50"
          onClick={closeSidebar}
        ></div>
      )}
      <button onClick={toggleSidebar} className='h-[32px] w-[32px]  rounded-full hover:bg-[#ffffff16] flex items-center justify-center'>
        <img src='/menu.svg' alt='sidebar-menu' title='menu' width={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed flex flex-col p-3 top-0 left-0 z-50 h-full w-64 bg-[#323639] shadow-lg transform transition-transform ease-in-out duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <a href='https://Frametagger.com' className='flex items-center gap-2 border-b pb-2 border-[#80808056]'>
          <img src="/logo192.png" alt="" width={40} />
          <p style={{fontFamily:"Oswald"}} className='text-white text-xl'>Frametagger</p>
        </a>
        <div className='text-white my-4 flex flex-col gap-y-4 font-semibold'>
          <button className={activeTab=="pdf" && 'bg-[#80808059] p-3 rounded-md'} onClick={() => setActiveTab("pdf")}>
            Normal View
          </button>
          {isList && <button  className={activeTab=="list" && 'bg-[#80808059] p-3 rounded-md'} onClick={() => setActiveTab("list")}>
            List View
          </button>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
