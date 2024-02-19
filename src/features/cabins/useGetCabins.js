import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useGetCabins() {
  const {
    loadingCabins,
    isErrorCabins,
    errorCabins,
    data: cabins,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { loadingCabins, isErrorCabins, errorCabins, cabins };
}
