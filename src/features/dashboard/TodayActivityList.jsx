import { useTodayActivity } from "./useTodayActivity";
import Loader from "../../components/common/Loader";
import ErrorIndicator from "../../components/common/ErrorIndicator";
import TodayActivityItem from "./TodayActivityItem";

function TodayActivityList() {
  const { isLoading, isError, error, data } = useTodayActivity();

  if (isLoading) return <Loader />;
  return (
    <div
      // To make a custom scrollbar
      id="activity-list"
      className="h-[400px] overflow-y-auto rounded-lg bg-white p-6 shadow-sm dark:bg-dark-bg"
    >
      <h2 className="heading-2 mb-6 text-balance" aria-label="today activities">
        Today
      </h2>

      {isError && <ErrorIndicator displayedError={error} />}
      {!data?.length && (
        <p className="sec-text-color text-lg">
          Sorry, there is no data added today to be displayed.
        </p>
      )}

      {data && (
        <ul>
          {data.map((booking) => {
            return <TodayActivityItem key={booking.id} activity={booking} />;
          })}
        </ul>
      )}
    </div>
  );
}

export default TodayActivityList;
