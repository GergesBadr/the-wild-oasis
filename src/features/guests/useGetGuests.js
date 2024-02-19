import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export function useGetGuests() {
  const {
    loadingGuests,
    isErrorGuests,
    errorGuests,
    data: guests,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  return { loadingGuests, isErrorGuests, errorGuests, guests };
}
