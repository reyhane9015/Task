function Input({
  id,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  type = "text",
  error,
  disabled = false,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-[15px] text-slate-800 font-semibold"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`input-box flex border rounded-lg ${
          error ? "border-red-500" : "border-gray-100"
        }`}
      >
        {type === "textarea" ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            rows={6}
            className="w-full outline-none text-gray-700 p-2 resize-y rounded-lg border-0"
          />
        ) : (
          <input
            id={id}
            value={value}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full outline-none text-gray-700 p-2"
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default Input;
