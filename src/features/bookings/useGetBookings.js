import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { bookingsItemsPerPage } from "../../utils/constants";
import { getBookings } from "../../services/apiBookings";

export function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const currFilterValue = searchParams.get("status");
  const filterInfo =
    !currFilterValue || currFilterValue === "all"
      ? null
      : { filterField: "status", filterValue: currFilterValue };

  // Sort
  const currSortValue = searchParams.get("sort") || "start_date-asc";
  const [sortField, sortMethod] = currSortValue.split("-");
  const sortInfo = { sortField, sortMethod };

  // Pagination
  const currPageValue = Number(searchParams.get("page")) || 1;

  // The main query
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["bookings", filterInfo, sortInfo, currPageValue],
    queryFn: () => getBookings(filterInfo, sortInfo, currPageValue),
  });

  // Prefetch if we are not in the last page
  const totalPagesCount = Math.ceil(data?.count / bookingsItemsPerPage);
  const nextPage = currPageValue + 1;
  if (currPageValue < totalPagesCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterInfo, sortInfo, nextPage],
      queryFn: () => getBookings(filterInfo, sortInfo, nextPage),
    });
  }

  // Should previous pages prefetched? I think it doesn't make sense (ONLY HERE, IN OUR CASE),
  // if user is moving backwards to the previous page, it means that they were already in it
  // then moved forward then moved backwards again (page 3 > page 4 > page 3 again),
  // that's the most common scenario, and react query already handle it for us with the cache!

  // users can change the "page" in URL to 5 for example, then go back to 4, in this case page 4 won't be in cache
  // and it would trigger a loader, but almost no user would do it!

  return { data, error, isError, isLoading };
}
