import React, { useState, useCallback } from "react";
import useItemForm from "./../../hooks/useItemForm";
import Input from "../../components/Input";
import toast from "react-hot-toast";
import Loading from "../Loading";

function ItemForm({ initialData = {}, onSubmit, submitButtonText = "Save" }) {
  const {
    title,
    subTitle,
    errors,
    setErrors,
    handleTitleChange,
    handleSubTitleChange,
    validateForm,
    reset,
  } = useItemForm(initialData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const formErrors = validateForm();

      if (Object.keys(formErrors).length === 0) {
        try {
          setIsSubmitting(true);
          await onSubmit(title, subTitle);
          reset();
        } catch (error) {
          toast.error(error.message || "Submission failed.");
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setErrors(formErrors);
      }
    },
    [title, subTitle, validateForm, onSubmit, reset, setErrors]
  );

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <Input
        id="title"
        value={title}
        type="text"
        onChange={handleTitleChange}
        label="Title"
        placeholder="exp: title"
        error={errors.title}
        disabled={isSubmitting}
        required
      />
      <Input
        id="subtitle"
        value={subTitle}
        type="textarea"
        onChange={handleSubTitleChange}
        label="subtitle"
        placeholder="exp: subtitle"
        error={errors.subTitle}
        disabled={isSubmitting}
        required
      />
      <div className="flex mx-auto mt-8">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? <Loading /> : submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default React.memo(ItemForm);
