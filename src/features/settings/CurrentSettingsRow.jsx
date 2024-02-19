function CurrentSettingsRow({ isFor, displayedText, value }) {
  return (
    <div className="flex flex-col items-start border-b pb-3 sm:flex-row sm:items-center sm:border-b-0 dark:border-b-gray-700">
      <span aria-describedby={isFor} className="basis-1/2">
        {displayedText}
      </span>
      <span id={isFor} className="text-lg font-medium">
        {value}
      </span>
    </div>
  );
}

export default CurrentSettingsRow;
