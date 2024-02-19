function Checkbox({ children, id, checked, onChange, disabled = false }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-white p-5 dark:border-gray-700 dark:bg-dark-bg">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="min-h-6 min-w-6 cursor-pointer rounded-lg accent-indigo-600 disabled:cursor-not-allowed"
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}

export default Checkbox;
