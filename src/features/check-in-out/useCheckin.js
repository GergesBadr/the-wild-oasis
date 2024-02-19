import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin(bookingId, breakfastInfo) {
  const queryClient = useQueryClient();

  const { isPending: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: () => {
      if (breakfastInfo) {
        updateBooking(bookingId, breakfastInfo);
      } else {
        updateBooking(bookingId, {});
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", String(bookingId)],
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success(`Checked in booking #${bookingId} successfully!`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCheckingIn, checkIn };
}
