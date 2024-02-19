import { useSearchParams } from "react-router-dom";

function Filter({
  searchParamsField,
  optionsInOrder = [],
  paramsToBeReset,
  whatFor,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currFilterValue =
    searchParams.get(searchParamsField) || optionsInOrder.at(0).value;

  function handleFilter(value) {
    searchParams.set(searchParamsField, value);
    // Reset neccessary params in URL, for example in pagination logic, if user was in page 2,
    // then they clicked on a specific filtered data which does not have enough items to be in page 2 it will throw an error
    paramsToBeReset?.map((param) => {
      searchParams.set(param.name, param.value);
    });

    // Finally params
    setSearchParams(searchParams);
  }

  return (
    <div
      className="min-h-[48px] space-x-2 rounded-lg border bg-white p-1.5 shadow-sm dark:border-gray-700 dark:bg-dark-bg"
    >
      {optionsInOrder.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleFilter(opt.value)}
          aria-label={`display ${opt.value} ${whatFor}`}
          disabled={currFilterValue === opt.value}
          className={`rounded-md px-2 py-1 duration-200 hover:bg-indigo-600 hover:text-gray-200 disabled:bg-indigo-600 ${
            currFilterValue === opt.value
              ? "bg-indigo-600 text-gray-200"
              : "bg-transparent"
          } `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;