function ButtonWithIcon({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-indigo-600 dark:text-gray-300 "
    >
      {children}
    </button>
  );
}

export default ButtonWithIcon;
