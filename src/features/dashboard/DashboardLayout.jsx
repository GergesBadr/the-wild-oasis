import { useSearchParams } from "react-router-dom";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useGetCabins } from "../cabins/useGetCabins";
import StatsList from "./StatsList";
import TodayActivityList from "./TodayActivityList";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Loader from "../../components/common/Loader";

function DashboardLayout() {
  // Bookings and stays
  const { recentBookings, loadingRecentBookings } = useRecentBookings();
  const { confirmedStays, loadingRecentStays } = useRecentStays();

  // Number of days
  const [searchParams] = useSearchParams();
  const numOfDays = Number(searchParams.get("last")) || 7;

  // Number of cabins
  const { cabins } = useGetCabins();
  const numOfCabins = cabins?.length;

  if (loadingRecentBookings || loadingRecentStays) return <Loader />;

  return (
    <div className="grid gap-4 lg:grid-cols-4 [&>div]:lg:col-span-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatsList
          recentBookings={recentBookings}
          confirmedStays={confirmedStays}
          numOfDays={numOfDays}
          numOfCabins={numOfCabins}
        />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <TodayActivityList />
        <DurationChart confirmedStays={confirmedStays} />
      </div>
      <div>
        <SalesChart recentBookings={recentBookings} numOfDays={numOfDays} />
      </div>
    </div>
  );
}

export default DashboardLayout;
