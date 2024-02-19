import { useSearchParams } from "react-router-dom";

function Sort({ optionsInOrder = [], whatFor }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currSortValue = searchParams.get("sort") || optionsInOrder.at(0).value;

  function handleSort(e) {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <select
      onChange={handleSort}
      value={currSortValue}
      aria-label={`Sort ${whatFor}`}
      className="min-h-[48px] rounded-lg border bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-dark-bg"
    >
      {optionsInOrder.map((opt) => {
        return (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        );
      })}
    </select>
  );
}

export default Sort;
