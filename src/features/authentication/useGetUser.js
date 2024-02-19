import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../../services/apiAuthentication";

export function useGetUser() {
  const { isLoading, data: user = {} } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
  });

  const isAuthenticated = user?.role === "authenticated";
  return { isLoading, user, isAuthenticated };
}
