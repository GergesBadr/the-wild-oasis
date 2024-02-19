import { useSearchParams } from "react-router-dom";
import { useGetCabins } from "./useGetCabins";
import CabinRow from "./CabinRow";
import Menus from "../../components/common/Menus";
import Empty from "../../components/common/Empty";
import Loader from "../../components/common/Loader";
import ErrorIndicator from "../../components/common/ErrorIndicator";
import Pagination from "../../components/common/Pagination";
import { cabinsItemsPerPage } from "../../utils/constants.js";

function CabinTable() {
  const {
    cabins = [],
    loadingCabins,
    isErrorCabins,
    errorCabins,
  } = useGetCabins();
  const [searchParams] = useSearchParams();

  // Client side data manipulation (filtering, sorting and pagination)
  // Just for learning and practising purposes, in real-world apps, we would use client-side.
  // As used here in "bookings" page.

  // 1. Filter cabins by discount
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;

  switch (filterValue) {
    case "all":
      filteredCabins = cabins;
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount <= 0);
      break;
    default:
      filteredCabins = cabins;
  }

  // 2. Sort cabins
  const sortValue = searchParams.get("sort") || "name-asc";
  const [sortField, sortMethod] = sortValue.split("-");
  const modifier = sortMethod === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    if (typeof a[sortField] === "string" && typeof b[sortField] === "string") {
      return a[sortField].localeCompare(b[sortField]) * modifier;
    }
    return (a[sortField] - b[sortField]) * modifier;
  });

  // 3. Pagination
  const currPage = Number(searchParams.get("page")) || 1;
  const totalCabinsCount = sortedCabins.length;
  const totalPages = Math.ceil(totalCabinsCount / cabinsItemsPerPage);

  const firstItemIndex = (currPage - 1) * cabinsItemsPerPage;
  const lastItemIndex =
    currPage === totalPages ? totalCabinsCount : currPage * cabinsItemsPerPage;

  const finialCabins = sortedCabins.slice(firstItemIndex, lastItemIndex);

  // Return
  if (loadingCabins) return <Loader />;
  if (isErrorCabins)
    return <ErrorIndicator displayedError={errorCabins.message} />;
  if (!cabins || totalCabinsCount === 0) return <Empty />;

  return (
    <Menus>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead className="bg-gray-100 text-left dark:bg-dark-bg dark:text-white">
            <tr className="uppercase tracking-wider [&>th:first-child]:rounded-tl-lg [&>th:last-child]:rounded-tr-lg [&>th]:p-4">
              <th>Image</th>
              <th>Cabin</th>
              <th>Capacity</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {finialCabins.map((cabin) => {
              return <CabinRow key={cabin.id} cabin={cabin} />;
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" className="p-4">
                <Pagination
                  totalResults={totalCabinsCount}
                  itemsPerPage={cabinsItemsPerPage}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Menus>
  );
}

export default CabinTable;
