import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuest as createGuestAPI } from "../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createGuest } = useMutation({
    mutationFn: async (guestData) => {
      return createGuestAPI(guestData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
      toast.success("Successfully create a new guest!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createGuest };
}
