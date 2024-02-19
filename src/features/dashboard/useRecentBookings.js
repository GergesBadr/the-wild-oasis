import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numOfDays = Number(searchParams.get("last")) || 7;

  // Subtract 7, 30 or 90 days from today
  const targetDate = subDays(new Date(), numOfDays).toISOString();

  const { data: recentBookings, isLoading: loadingRecentBookings } = useQuery({
    queryFn: () => getBookingsAfterDate(targetDate),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["bookings", `last-${numOfDays}`],
  });

  return { recentBookings, loadingRecentBookings };
}
