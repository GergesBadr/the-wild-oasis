import { useGetSettings } from "./useGetSettings";
import ErrorIndicator from "../../components/common/ErrorIndicator";
import Loader from "../../components/common/Loader";
import CurrentSettingsRow from "./CurrentSettingsRow";

function CurrentSettings() {
  const { loadingSettings, isErrorSettings, errorSettings, settings } =
    useGetSettings();

  // without the empty obj fallback  => settings || {}
  // we would get an error of undefiend properties, because we can not destructure "settings" if it is undefined
  const {
    min_booking_length,
    max_booking_length,
    max_guests_per_booking,
    breakfast_price,
  } = settings || {};

  if (loadingSettings) return <Loader />;
  if (isErrorSettings)
    return <ErrorIndicator displayedError={errorSettings.message} />;

  return (
    <div className="space-y-4 rounded-lg bg-white px-10 py-6 shadow-lg dark:bg-dark-bg">
      <CurrentSettingsRow
        displayedText="Minimum nights per booking:"
        isFor="minimum-nights"
        key="minimum-nights"
        value={min_booking_length}
      />

      <CurrentSettingsRow
        displayedText="Maximum nights per booking:"
        isFor="maximum-nights"
        key="maximum-nights"
        value={max_booking_length}
      />

      <CurrentSettingsRow
        displayedText="Maximum guests per booking:"
        isFor="maximum-guests"
        key="maximum-guests"
        value={max_guests_per_booking}
      />

      <CurrentSettingsRow
        displayedText="Breakfast price:"
        isFor="breakfast-price"
        key="breakfast-price"
        value={breakfast_price}
      />
    </div>
  );
}

export default CurrentSettings;
