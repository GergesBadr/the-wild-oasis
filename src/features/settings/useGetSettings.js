import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useGetSettings() {
  const {
    loadingSettings,
    isErrorSettings,
    errorSettings,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { loadingSettings, isErrorSettings, errorSettings, settings };
}
