import { useQuery } from "@tanstack/react-query";
import { getTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["today-activities"],
    queryFn: getTodayActivity,
  });

  return { isLoading, isError, error, data };
}
