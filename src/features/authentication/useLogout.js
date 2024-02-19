import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuthentication";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      toast.success("Logged out successfully!");
      queryClient.removeQueries();
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, logout };
}
