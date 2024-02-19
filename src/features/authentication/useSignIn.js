import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn as signInAPI } from "../../services/apiAuthentication";

export function useSignIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: pendingSignIn, mutate: signIn } = useMutation({
    // !!! IMPORTANT !!!
    // The "mutationFn" should return a Promise, since "signIn" fun already returns a Promise,
    // we just need to return it directly from mutationFn.
    // Otherwise, "useMutation" hook won't wait for the Promise to be resolved,
    // and will consider the mutation successful even if it's not!
    mutationFn: async ({ email, password }) => {
      return signInAPI({ email, password });
    },
    onSuccess: (data) => {
      toast.success("Successfully signed in!");
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message, { duration: 5000 });
    },
  });

  return { pendingSignIn, signIn };
}
