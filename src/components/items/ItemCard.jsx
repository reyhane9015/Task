import React from "react";

function ItemCard() {
  return (
    <div className="relative flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 overflow-hidden cursor-pointer">
      <div>ItemCard</div>
      <div className="flex items-center gap-4">
        <button className="btn-small-light" onClick={console.log("delete")}>
          {/* <LuPalette className="text-[16px]" /> */}
          <span className="hidden md:block">Delete</span>
        </button>

        <button className="btn-small-light" onClick={console.log("delete")}>
          {/* <LuPalette className="text-[16px]" /> */}
          <span className="hidden md:block">Delete</span>
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
