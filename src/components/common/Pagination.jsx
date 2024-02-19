import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

function Pagination({ totalResults = 1, itemsPerPage = 10 }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const from = (currPage - 1) * itemsPerPage + 1; // => 21
  const to = currPage === totalPages ? totalResults : currPage * itemsPerPage;

  function goToPrevPage() {
    const handlePrevious = currPage === 1 ? currPage : currPage - 1;
    searchParams.set("page", handlePrevious);
    setSearchParams(searchParams);
  }

  function goToNextPage() {
    const handleNext = currPage === totalPages ? currPage : currPage + 1;
    searchParams.set("page", handleNext);
    setSearchParams(searchParams);
  }

  // We can say that if the totalResults is grater than itemsPerPage => then do NOT show the pagination at all
  // but I decided to keep showing it so that the user knows that there is a pagination if the data becomes bigger

  return (
    <div className="flex items-center justify-between">
      <div className="[&>span]:font-semibold [&>span]:text-gray-600 [&>span]:dark:text-gray-400">
        Showing
        <span>
          {" "}
          {from}-{to}{" "}
        </span>
        of <span>{totalResults} </span>
        results
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={goToPrevPage}
          disabled={currPage === 1}
          aria-label="Previous page"
          className="flex items-center justify-center gap-2 rounded-lg bg-transparent px-2 py-1 font-medium duration-200 disabled:text-gray-500 [&:not(:disabled)]:hover:bg-indigo-600 [&:not(:disabled)]:hover:text-gray-200"
        >
          <HiOutlineArrowLeft />
          <span>Previous</span>
        </button>

        <button
          onClick={goToNextPage}
          disabled={currPage === totalPages}
          aria-label="Next page"
          className="flex items-center justify-center gap-2 rounded-lg bg-transparent px-2 py-1 font-medium duration-200 disabled:text-gray-500 [&:not(:disabled)]:hover:bg-indigo-600 [&:not(:disabled)]:hover:text-gray-200"
        >
          <span>Next</span>
          <HiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
