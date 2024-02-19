import {
  HiOutlineHomeModern,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

// Just a presentational component
function BookingDataContainer({ bookingDetails }) {
  // Needed details
  const {
    created_at,
    start_date,
    end_date,
    cabin_price,
    extra_price,
    total_price,
    has_breakfast,
    is_paid,
    num_of_guests,
    num_of_nights,
    observations,
    cabins: { name: cabinName },
    guests: {
      country_flag,
      email,
      full_name: guestName,
      national_id,
      nationality,
    },
  } = bookingDetails;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-dark-bg ">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 bg-indigo-600 px-7 py-4 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <HiOutlineHomeModern className="text-4xl" />
          <p>
            {num_of_nights} nights in cabin {cabinName}
          </p>
        </div>
        <p>
          <span>{format(start_date, "EEE, LLL dd yyyy")}</span>
          <span>
            {" "}
            ({isToday(start_date) ? "Today" : formatDistanceFromNow(start_date)}
            ) &mdash; {""}
          </span>
          <span>{format(end_date, "EEE, LLL dd yyyy")}</span>
        </p>
      </div>

      {/* Details */}
      <div className="space-y-6 p-7">
        <div className="flex flex-col items-start gap-4 text-gray-500 md:flex-row md:items-center dark:text-gray-300">
          <div className="flex items-center gap-2">
            {country_flag && (
              <img
                src={country_flag}
                alt={`${nationality} Flag.`}
                className="max-w-9"
              />
            )}
            <p className="font-medium text-gray-700 dark:text-white">
              {guestName} {""}
              {num_of_guests > 1 ? `+ ${num_of_guests - 1} guests` : ""}
            </p>
          </div>
          <p> &bull; {email} </p>
          <p>&bull; National ID: {national_id}</p>
        </div>

        {observations && (
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <HiOutlineChatBubbleBottomCenterText className="text-2xl text-indigo-600" />
              <span className="font-medium">Observations:</span>
            </div>
            <p className="text-gray-500 dark:text-gray-300">{observations}</p>
          </div>
        )}

        <div className="flex items-center gap-2">
          {has_breakfast ? (
            <HiOutlineCheckCircle className="text-2xl text-indigo-600" />
          ) : (
            <HiOutlineXCircle className="text-2xl text-indigo-600" />
          )}
          <span className="font-medium text-gray-700 dark:text-white">
            Breakfast included?
          </span>
          <span className="text-gray-500 dark:text-gray-300">
            {has_breakfast ? "Yes" : "No"}
          </span>
        </div>

        <div
          className={`flex items-center justify-between rounded-lg p-5 font-medium text-white ${
            is_paid ? "bg-green-800" : "bg-yellow-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <HiOutlineCurrencyDollar className="text-2xl" />
            <p>
              <span>Total price: </span>
              <span>{formatCurrency(total_price)}</span>
              {extra_price && (
                <span>
                  {" "}
                  ({formatCurrency(cabin_price)} Cabin +{" "}
                  {formatCurrency(extra_price)} Breakfast ){" "}
                </span>
              )}
            </p>
          </div>
          <p className="uppercase">
            {is_paid ? "Paid" : "Will pay at property"}
          </p>
        </div>

        <p className="text-right text-gray-500 dark:text-gray-300">
          Booked {format(created_at, "EEE, LLL dd yyyy, h:mm bb")}
        </p>
      </div>
    </div>
  );
}

export default BookingDataContainer;
