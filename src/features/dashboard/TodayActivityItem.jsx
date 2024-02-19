import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Button from "../../components/common/Button";

function TodayActivityItem({ activity }) {
  const {
    id,
    status,
    num_of_nights,
    guests: { full_name, nationality, country_flag },
  } = activity;

  const navigate = useNavigate();
  const { isCheckingOut, checkOut } = useCheckout(id);

  return (
    <li className="flex flex-col flex-wrap items-start justify-between gap-2 border-t px-4 py-3 sm:flex-row sm:items-center dark:border-t-gray-700">
      <div className="flex items-center gap-4">
        <img
          src={country_flag}
          alt={`${nationality} Flag`}
          className="max-w-9 shadow-md"
        />
        <span>{full_name}</span>
        {status === "unconfirmed" && (
          <span className="font-medium uppercase tracking-wider text-green-500 dark:text-green-500">
            &bull; Arriving
          </span>
        )}
        {status === "checked-in" && (
          <span className="font-medium uppercase tracking-wider text-blue-500 dark:text-blue-500">
            &bull; Leaving
          </span>
        )}
      </div>
      <div className="flex w-full items-center justify-between gap-4 sm:w-auto">
        <span>{num_of_nights} Nights</span>
        {status === "unconfirmed" && (
          <Button size="small" onClick={() => navigate(`/checkin/${id}`)}>
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button size="small" onClick={checkOut} disabled={isCheckingOut}>
            Check out
          </Button>
        )}
      </div>
    </li>
  );
}

export default TodayActivityItem;
