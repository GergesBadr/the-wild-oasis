import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../services/apiBookings";

export function useGetBookingById() {
  const { bookingId } = useParams();

  const {
    data: bookingDetails,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", String(bookingId)],
    queryFn: () => getBookingById(bookingId),
  });

  return { bookingDetails, error, isError, isLoading };
}
