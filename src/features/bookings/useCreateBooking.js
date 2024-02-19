import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingAPI } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { isPending: isCreatingBooking, mutate: createBooking } = useMutation({
    mutationFn: async (bookingData) => {
      return createBookingAPI(bookingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Successfully create a new booking!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreatingBooking, createBooking };
}
