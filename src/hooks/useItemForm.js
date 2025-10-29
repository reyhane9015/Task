import { useState, useEffect, useCallback } from "react";

function useItemForm(initialData = {}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [subTitle, setSubTitle] = useState(initialData.subTitle || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initialData.title || "");
    setSubTitle(initialData.subTitle || "");
    setErrors({});
  }, [initialData]);

  const validateField = useCallback((name, value) => {
    return !value.trim() ? `${name} is required` : "";
  }, []);

  const handleTitleChange = useCallback(
    (e) => {
      const value = e.target.value;
      setTitle(value);

      setErrors((prevErrors) => ({
        ...prevErrors,
        title: validateField("Title", value),
      }));
    },
    [validateField]
  );

  const handleSubTitleChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSubTitle(value);

      setErrors((prevErrors) => ({
        ...prevErrors,
        subTitle: validateField("Subtitle", value),
      }));
    },
    [validateField]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!subTitle.trim()) newErrors.subTitle = "Subtitle is required";
    return newErrors;
  }, [title, subTitle]);

  const reset = useCallback(() => {
    setTitle("");
    setSubTitle("");
    setErrors({});
  }, []);

  return {
    title,
    subTitle,
    errors,
    setErrors,
    handleTitleChange,
    handleSubTitleChange,
    validateForm,
    reset,
  };
}

export default useItemForm;
