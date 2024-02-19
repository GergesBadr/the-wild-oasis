import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";

export function useDeleteBooking(bookingId) {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: () => {
      deleteBookingAPI(bookingId);
    },
    onSuccess: () => {
      // We should invalidate only with queryKey that needed to be invalidate,
      // but the queryKey for bookings is complicated because it includes all apllied filters in the URL
      // so it's hard to define it, so... just refetchand invalidate everything in the cache when delete a booking.
      // I used the same method when checking out a booking
      queryClient.refetchQueries();
      queryClient.invalidateQueries();
      toast.success(`Delete booking #${bookingId} successfully`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteBooking };
}
