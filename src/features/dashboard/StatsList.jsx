import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import StatsItem from "./StatsItem";

function StatsList({ recentBookings, confirmedStays, numOfDays, numOfCabins }) {
  const recentBookingsNum = recentBookings.length;

  const recentSales = formatCurrency(
    recentBookings.reduce((acc, current) => acc + current.total_price, 0),
  );

  const checkins = confirmedStays.length;

  // occupation should be calculated with number of occupied rooms and total rooms
  // but here we will do it using checked in nights and total nights instead of rooms
  const checkedInNights = confirmedStays.reduce(
    (acc, curr) => acc + curr.num_of_nights,
    0,
  );
  const availableNights = numOfDays * numOfCabins;
  const occupation = `${((checkedInNights / availableNights) * 100).toFixed(
    2,
  )}%`;

  return (
    <>
      <StatsItem
        title="Bookings"
        value={recentBookingsNum}
        backgroundColor="bg-sky-100 dark:bg-sky-800"
        icon={
          <HiOutlineBriefcase className="h-7 w-7 text-sky-700 dark:text-sky-100" />
        }
      />

      <StatsItem
        title="Sales"
        value={recentSales}
        backgroundColor="bg-green-100 dark:bg-green-800"
        icon={
          <HiOutlineBanknotes className="h-7 w-7 text-green-700 dark:text-green-100" />
        }
      />

      <StatsItem
        title="Check ins"
        value={checkins}
        backgroundColor="bg-indigo-100 dark:bg-indigo-800"
        icon={
          <HiOutlineCalendarDays className="h-7 w-7 text-indigo-700 dark:text-indigo-100" />
        }
      />

      <StatsItem
        title="Occupancy rate"
        value={occupation}
        backgroundColor="bg-yellow-100 dark:bg-yellow-800"
        icon={
          <HiOutlineChartBar className="h-7 w-7 text-yellow-700 dark:text-yellow-100" />
        }
      />
    </>
  );
}

export default StatsList;
