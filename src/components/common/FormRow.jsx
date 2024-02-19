// Make sure to include only ONE child element to the component, whatever it's type.
// othewise, edit the logic of getting the "htmlFor" attribute.

function FormRow({ label, error, describedby, children }) {
  return (
    <div className="grid grid-cols-1 items-center gap-3 border-b border-b-gray-200 py-4 first:pt-0 md:grid-cols-3 md:gap-6 dark:border-b-gray-800 [&>:nth-child(2)]:sm:w-[65%] [&>:nth-child(2)]:md:w-full">
      <label htmlFor={children?.props?.id} className="font-medium">
        {label}
      </label>

      {/* To make the component more reusable,
      because the given input could have a various of different settings
      also it could be a textarea, select, etc... */}
      {children}

      {error && (
        <span
          // For a11y, to alert users about form errors, and keep track of it's content text if it changed to announce it
          id={describedby}
          className="text-balance text-sm font-medium text-red-400"
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default FormRow;
