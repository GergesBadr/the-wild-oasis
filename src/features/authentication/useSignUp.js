import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { signUp as signUpAPI } from "../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const navigate = useNavigate();

  const { isPending: pendingSignUp, mutate: signUp } = useMutation({
    mutationFn: async ({ full_name, email, password }) => {
      return signUpAPI({ full_name, email, password });
    },
    onSuccess: () => {
      window.confirm(
        `Successfully created a new user, Please let them check provided email to verify the user
        \n \n Unfortunately, you will be logged-out now, login again to keep using the app.`,
      );
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message, { duration: 5000 });
    },
  });

  return { pendingSignUp, signUp };
}
