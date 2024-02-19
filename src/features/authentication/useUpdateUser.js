import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserAPI } from "../../services/apiAuthentication";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingUser, mutate: updateUser } = useMutation({
    mutationFn: async ({ full_name, password, avatar }) => {
      return updateUserAPI({ full_name, password, avatar });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Successfully updated user!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdatingUser, updateUser };
}
