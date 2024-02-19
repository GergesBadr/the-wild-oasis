import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useGetBookingById } from "../bookings/useGetBookingById";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckin } from "./useCheckin";
import { useGetSettings } from "../settings/useGetSettings";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../components/common/Button";
import BookingDataContainer from "../bookings/BookingDataContainer";
import ButtonWithIcon from "../../components/common/ButtonWithIcon";
import Loader from "../../components/common/Loader";
import Checkbox from "../../components/Checkbox";

function Checkin() {
  // We can't set the state initally to is_paid because at the beginning it will be undefined until the data arrive
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();

  const { bookingDetails = {}, isLoading } = useGetBookingById();
  const {
    id: bookingId,
    total_price,
    has_breakfast,
    is_paid,
    guests,
    status,
    num_of_nights,
    num_of_guests,
  } = bookingDetails;

  // Calculate breakfast price
  const { settings = {} } = useGetSettings();
  const optionalBreakfastPrice =
    settings?.breakfast_price * num_of_nights * num_of_guests;
  const breakfastInfo = {
    has_breakfast: true,
    extra_price: optionalBreakfastPrice,
    total_price: total_price + optionalBreakfastPrice,
  };

  // Checkin custom hook
  const { isCheckingIn, checkIn } = useCheckin(bookingId, breakfastInfo);

  // Set confirm-paid state according to is_paid value
  useEffect(() => {
    setConfirmPaid(is_paid ? is_paid : false);
  }, [is_paid]);

  if (isLoading) return <Loader />;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="heading-2">Check in booking #{bookingId}</h1>
        <ButtonWithIcon onClick={moveBack}>
          <HiOutlineArrowLeft />
          <span>Back</span>
        </ButtonWithIcon>
      </div>
      <BookingDataContainer bookingDetails={bookingDetails} />
      {!has_breakfast && (
        <Checkbox
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((pre) => !pre);
            setConfirmPaid(false);
          }}
          id="add-breakfast"
        >
          Want to add breakfast for ({formatCurrency(optionalBreakfastPrice)})?
        </Checkbox>
      )}

      <Checkbox
        checked={confirmPaid}
        onChange={() => setConfirmPaid((pre) => !pre)}
        disabled={confirmPaid}
        id="confirm-paid"
      >
        I confirm that {guests.full_name} has paid the total amount of{" "}
        {!addBreakfast
          ? formatCurrency(total_price)
          : `${formatCurrency(
              total_price + optionalBreakfastPrice,
            )} (${formatCurrency(total_price)} + ${formatCurrency(
              optionalBreakfastPrice,
            )})`}
      </Checkbox>

      <div className="space-x-4 text-right">
        {status !== "checked-in" && (
          <Button onClick={checkIn} disabled={!confirmPaid || isCheckingIn}>
            Check in booking #{bookingId}
          </Button>
        )}
        <Button variation="sec" onClick={moveBack}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default Checkin;
