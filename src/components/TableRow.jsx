import React from "react";
import { LuTrash2, LuPencil } from "react-icons/lu";

function TableRow({ item, onDelete, onEdit }) {
  return (
    <tr key={item.id}>
      <td className="p-5 border-b border-gray-200 bg-white text-sm md:text-lg">
        <p className="text-gray-500 text-nowrap">{item.dateCreated}</p>
      </td>
      <td className="p-5 border-b border-gray-200 bg-white text-sm md:text-lg">
        <p className="text-gray-500 text-nowrap">{item.title}</p>
      </td>
      <td className="p-5 border-b border-gray-200 bg-white text-sm md:text-lg">
        <p className="text-gray-500 text-nowrap truncate max-w-xs">
          {item.subTitle}
        </p>
      </td>

      <td className="p-5 border-b border-gray-200 bg-white text-sm md:text-lg">
        <div className="flex items-center justify-end gap-4">
          <button
            className="btn-small-light"
            aria-label="Delete item"
            onClick={() => onDelete(item.id)}
          >
            <LuTrash2 className="text-[16px]" />
            <span className="hidden md:block">Delete</span>
          </button>
          <button
            className="btn-small-light"
            aria-label="Edit item"
            onClick={() => onEdit(item)}
          >
            <LuPencil className="text-[16px]" />
            <span className="hidden md:block">Edit</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
