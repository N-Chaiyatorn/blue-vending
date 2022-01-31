import React from "react";

function Header() {
  return (
    <div className="flex items-center px-4 h-20 sticky bg-yellow-50 shadow-lg">
      <img
        src="/bluepi.png"
        alt="bluepi logo"
        className="object-contain h-20"
        draggable="false"
      />
      <div className="flex text-xl font-medium h-full px-6 items-center rounded-md 
      hover:bg-yellow-300 hover:cursor-pointer duration-200">
        {/* Aggregate product type */}
      </div>
    </div>
  );
}

export default Header;
