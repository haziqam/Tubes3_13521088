import { useState } from "react";
import {chatRoom }from "../algorithm/interface"


const SideBar = () => {
  
  return (
    
      <div className="m-4 h-96">
        <button
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 w-56 text-xs font-medium text-purple-700 bg-transparent rounded-lg border border-purple-700 focus:ring-purple-500 focus:border-purple-500 block hover:border-purple-950 hover:text-purple-950"
        
          >
          + New Chat
        </button>

        <div className="flex-col items-center h-96 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-600">
          <button className="py-2.5 px-5 mr-2 mb-2 w-48 h-7 text-xs font-medium  bg-purple-400 hover:bg-purple-700 text-white 4 rounded">
          
          </button>
        </div>
      </div>
  );
};

export default SideBar;
