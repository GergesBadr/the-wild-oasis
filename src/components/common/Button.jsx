function Button({
  children,
  type,
  onClick,
  disabled,
  variation = "primary",
  size = "",
  extraClasses = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-md font-medium text-gray-200 shadow-md duration-300 disabled:bg-gray-600 ${
        variation === "primary" ? "bg-indigo-600 hover:bg-indigo-700" : ""
      } ${
        variation === "sec"
          ? "border border-gray-200 bg-transparent text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:bg-dark-bg dark:text-gray-200 dark:hover:bg-gray-900"
          : ""
      } ${variation === "danger" ? "bg-red-700 hover:bg-red-800" : ""} ${
        size === "small" ? "px-2 py-1" : "px-4 py-3"
      } ${extraClasses}`}
    >
      {children}
    </button>
  );
}

export default Button;
