import React, { useState, useEffect } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import Loading from "../../components/Loading";
import { LuTrash2, LuPencil } from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

function ItemsListPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // get all items
  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("/items")
      .then((res) => setItems(res.data))
      .catch((error) => setError("Failed to fetch items"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <MainLayout>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
          <Loading />
        </div>
      )}

      {/* Error message */}
      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {/* items Table */}
      <div className="overflow-x-auto">
        {items.length > 0 ? (
          <div className="mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-600 text-sm md:text-xl text-nowrap text-left font-semibold text-white uppercase tracking-wider">
                          Date Created
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-600 text-sm md:text-xl text-nowrap text-left font-semibold text-white uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-600 text-sm md:text-xl text-nowrap text-left font-semibold text-white uppercase tracking-wider">
                          SubTitle
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-600"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="p-5 border-b border-gray-200 bg-white text-sm md:text-lg">
                            <p className="text-gray-500 text-nowrap">
                              {item.dataCreated}
                            </p>
                          </td>
                          <td className="p-5 border-b border-gray-200 bg-white text-sm md:text-lg">
                            <p className="text-gray-500 text-nowrap">
                              {item.title}
                            </p>
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
                              >
                                <LuTrash2 className="text-[16px]" />
                                <span className="hidden md:block">Delete</span>
                              </button>
                              <button
                                className="btn-small-light"
                                aria-label="Edit item"
                              >
                                <LuPencil className="text-[16px]" />
                                <span className="hidden md:block">Edit</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center font-bold text-blue-800 text-lg">
            No items Found
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ItemsListPage;
