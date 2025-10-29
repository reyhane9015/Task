import React, { useState, useEffect, useMemo, useCallback } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Loading from "../components/Loading";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import { MdAdd } from "react-icons/md";
import ItemForm from "../components/Forms/ItemForm";
import TableRow from "../components/TableRow";

function ItemsListPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // get all items
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/items");
        setItems(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch items.");
        toast.error("Failed to fetch items.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Delete Item
  const handleDelete = async (id) => {
    const oldItems = [...items];
    setItems(items.filter((item) => item.id !== id));
    try {
      await axiosInstance.delete(`/items/${id}`);
      toast.success("Item deleted successfully!");
    } catch (error) {
      setError(error.message || "Something went wrong");
      setItems(oldItems);
      toast.error("Failed to delete item.");
    }
  };

  // Edit Item
  const handleEdit = async (id, updatedTitle, updatedSubTitle) => {
    const oldItems = [...items];

    const updatedItem = {
      title: updatedTitle,
      subTitle: updatedSubTitle,
      dateCreated: new Date().toLocaleString(),
    };

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, title: updatedTitle, subTitle: updatedSubTitle }
          : item
      )
    );

    try {
      await axiosInstance.put(`/items/${id}`, updatedItem);
      toast.success("Item edited successfully!");
      setOpenEditModal(false);
    } catch (error) {
      setItems(oldItems);
      setError(error.message || "Something went wrong");
      toast.error("Failed to edit item.");
    } finally {
      setOpenEditModal(false);
    }
  };

  // Add item
  const handleAdd = async (title, subTitle) => {
    const newItem = {
      dateCreated: new Date().toLocaleString(),
      title,
      subTitle,
    };
    try {
      const response = await axiosInstance.post(`/items`, newItem);
      setItems((prevItems) => [...prevItems, response.data]);
      toast.success("Item added successfully!");
      setOpenCreateModal(false);
    } catch (error) {
      setError(error.message || "Something went wrong");
      toast.error("Failed to create item.");
    }
  };

  const openEditModalHandler = useCallback(
    (item) => {
      setCurrentItem(item);
      setOpenEditModal(true);
    },

    []
  );

  const initialData = useMemo(() => currentItem || {}, [currentItem]);

  return (
    <MainLayout>
      {isLoading && <Loading fullscreen message="Fetching items..." />}

      {/* Error message */}
      {error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
        <>
          {/* create button */}
          <div className="px-4 sm:px-8">
            <button
              className="btn-secondary"
              aria-label="Create item"
              onClick={() => setOpenCreateModal(true)}
            >
              <MdAdd className="text-[16px]" />
              <span>Create Item</span>
            </button>
          </div>

          {/* items Table */}
          <div className="overflow-x-auto">
            {items.length > 0 ? (
              <div className="mx-auto px-4 sm:px-8">
                <div className="py-3 md:py-8">
                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-600 text-sm md:text-lg text-nowrap text-left font-semibold text-white uppercase tracking-wider">
                              Date Created
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-600 text-sm md:text-lg text-nowrap text-left font-semibold text-white uppercase tracking-wider">
                              Title
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-600 text-sm md:text-lg text-nowrap text-left font-semibold text-white uppercase tracking-wider">
                              SubTitle
                            </th>

                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-600"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => (
                            <TableRow
                              key={item.id}
                              item={item}
                              onDelete={handleDelete}
                              onEdit={openEditModalHandler}
                            />
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

          {/* create item Modals */}
          <Modal
            isOpen={openCreateModal}
            onClose={() => {
              setOpenCreateModal(false);
            }}
            title="Create Item"
          >
            <div>
              <ItemForm
                initialData={{}}
                onSubmit={handleAdd}
                submitButtonText="Create"
              />
            </div>
          </Modal>

          {/* edit item Modals */}
          <Modal
            isOpen={openEditModal}
            onClose={() => {
              setOpenEditModal(false);
            }}
            title="Edit Item"
          >
            <div>
              <ItemForm
                initialData={initialData}
                onSubmit={(title, subTitle) =>
                  handleEdit(currentItem.id, title, subTitle)
                }
                submitButtonText="Submit"
              />
            </div>
          </Modal>
        </>
      )}
    </MainLayout>
  );
}

export default ItemsListPage;
