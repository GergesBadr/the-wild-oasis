import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutBooking } from "../../services/apiBookings";

export function useCheckout(bookingId) {
  const queryClient = useQueryClient();

  const { isPending: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: () => {
      checkoutBooking(bookingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      queryClient.refetchQueries();
      toast.success(`Checked out booking #${bookingId} successfully`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCheckingOut, checkOut };
}
