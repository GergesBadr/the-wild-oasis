import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numOfDays = Number(searchParams.get("last")) || 7;

  // Subtract 7, 30 or 90 days from today
  const targetDate = subDays(new Date(), numOfDays).toISOString();

  const { data: recentStays, isLoading: loadingRecentStays } = useQuery({
    queryFn: () => getStaysAfterDate(targetDate),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["stays", `last-${numOfDays}`],
  });

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return { recentStays, confirmedStays, loadingRecentStays };
}
