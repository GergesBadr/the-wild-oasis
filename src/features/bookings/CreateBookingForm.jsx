import { useForm } from "react-hook-form";
import { addDays, isPast } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import { useGetGuests } from "../guests/useGetGuests";
import { useGetSettings } from "../settings/useGetSettings";
import { useGetCabins } from "../cabins/useGetCabins";
import { useCreateBooking } from "./useCreateBooking";
import FormRow from "../../components/common/FormRow";
import Loader from "../../components/common/Loader";
import ErrorIndicator from "../../components/common/ErrorIndicator";
import Button from "../../components/common/Button";

// Yes, it's a very long component and it's not a good practise,
// but I couldn't figure out how to split it into pieces
// as almost all the validation here is related and should be in one component
function CreateNewBooking({ onCloseModal }) {
  const { loadingGuests, isErrorGuests, guests } = useGetGuests();
  const { loadingCabins, isErrorCabins, cabins } = useGetCabins();
  const { loadingSettings, isErrorSettings, settings } = useGetSettings();
  const { isCreatingBooking, createBooking } = useCreateBooking();

  // React hook form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    delayError: 300,
  });

  // First make sure that the data has been fetched successfully, then compute it.
  if (loadingGuests || loadingSettings || loadingCabins) return <Loader />;
  if (isErrorGuests || isErrorCabins || isErrorSettings)
    return (
      <ErrorIndicator displayedError="An error has happend while getting current settings, cabins or guests data. Please try again later." />
    );

  // Get needed data => from guests, settings and cabins tables
  // 1. Settings data
  const {
    max_booking_length,
    min_booking_length,
    max_guests_per_booking,
    breakfast_price,
  } = settings || {};

  // 2. Guest data
  const avalibileGuests = guests?.map((guest) => {
    return {
      id: guest.id,
      full_name: guest.full_name,
      country_flag: guest.country_flag,
    };
  });
  const sortedGuests = avalibileGuests?.sort((a, b) => b.id - a.id);

  // 3. Cabin data
  const avalibileCabins = cabins?.map((cabin) => {
    return {
      id: cabin.id,
      name: cabin.name,
      max_capacity: cabin.max_capacity,
      regular_price: cabin.regular_price,
      discount: cabin.discount,
    };
  });

  const selectedCabinId = watch("cabin_id");
  const selectedCabinObj = avalibileCabins?.find(
    (cabin) => cabin.id === Number(selectedCabinId),
  );
  const selectedCabinCapacity = selectedCabinObj?.max_capacity;

  // Submit with final data
  function onSubmit(data) {
    let { num_of_nights, num_of_guests } = data;

    // Calculate properties:
    // 1. End date
    const calcEndDate = addDays(new Date(data.start_date), data.num_of_nights);

    // 2. Cabin details
    const calcExtraPrice = !data.has_breakfast
      ? 0
      : breakfast_price * num_of_nights * num_of_guests;

    const calcCabinPrice =
      (selectedCabinObj.regular_price - selectedCabinObj.discount) *
      num_of_guests *
      num_of_nights;

    const calcTotalPrice = calcCabinPrice + calcExtraPrice;

    // Return calculated properties to data again
    data.end_date = calcEndDate;
    data.extra_price = calcExtraPrice;
    data.cabin_price = calcCabinPrice;
    data.total_price = calcTotalPrice;

    // Create a new booking with final data
    createBooking(data, {
      onSuccess: () => {
        reset();
        onCloseModal();
      },
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="sec-text-color mb-3">
          <span className="font-semibold uppercase">Note: </span>
          To create a booking for non-existing guest, create the guest first
          then come back to create the booking.
        </p>

        {/* Guest */}
        <FormRow
          label="Guest"
          describedby="guest-id-error"
          error={errors?.guest_id?.message}
        >
          <select
            id="guest_id"
            aria-describedby="guest-id-error"
            {...register("guest_id", {
              valueAsNumber: true,
              required: "Guest is required",
            })}
            aria-invalid={errors.guest_id ? "true" : "false"}
            className="common-input"
          >
            <option value="" className="bg-white dark:bg-dark-bg">
              Select guest:
            </option>
            {sortedGuests?.map((guest) => {
              return (
                <option
                  key={guest.id}
                  value={guest.id}
                  className="bg-white dark:bg-dark-bg"
                >
                  {guest.full_name}
                </option>
              );
            })}
          </select>
        </FormRow>

        {/* Cabin */}
        <FormRow
          label="Cabin"
          describedby="cabin-id-error"
          error={errors?.cabin_id?.message}
        >
          <select
            id="cabin_id"
            aria-describedby="cabin-id-error"
            {...register("cabin_id", {
              valueAsNumber: true,
              required: "Cabin is required",
            })}
            aria-invalid={errors.cabin_id ? "true" : "false"}
            className="common-input"
          >
            <option value="" className="bg-white dark:bg-dark-bg">
              Select cabin:
            </option>
            {avalibileCabins?.map((cabin) => {
              return (
                <option
                  key={cabin.id}
                  value={cabin.id}
                  className="bg-white dark:bg-dark-bg"
                >
                  {cabin.name} &mdash; {""}
                  {formatCurrency(cabin.regular_price - cabin.discount)}
                </option>
              );
            })}
          </select>
        </FormRow>

        {/* Start date */}
        <FormRow
          label="Start date"
          describedby="start-date-error"
          error={errors?.start_date?.message}
        >
          <input
            type="date"
            id="start_date"
            aria-describedby="start-date-error"
            {...register("start_date", {
              valueAsDate: true,
              required: "Start date is required",
              validate: (currValue) => {
                return isPast(new Date(currValue))
                  ? "Start date must NOT be in the past"
                  : true;
              },
            })}
            aria-invalid={errors.start_date ? "true" : "false"}
            className="common-input"
          />
        </FormRow>

        {/* Number of nights */}
        <FormRow
          label="Number of nights"
          describedby="num-of-nights-error"
          error={errors?.num_of_nights?.message}
        >
          <input
            type="number"
            id="num_of_nights"
            aria-describedby="num-of-nights-error"
            {...register("num_of_nights", {
              valueAsNumber: true,
              required: "Number of nights is required",
              max: {
                value: max_booking_length,
                message:
                  "Should not be grater than maximum nights (in settings)",
              },
              min: {
                value: min_booking_length,
                message: "Should not be less than minimum nights (in settings)",
              },
            })}
            aria-invalid={errors.num_of_nights ? "true" : "false"}
            className="common-input"
          />
        </FormRow>

        {/* Number of guests */}
        <FormRow
          label="Number of guests"
          describedby="num_of_guests-error"
          error={errors?.num_of_guests?.message}
        >
          <input
            type="number"
            id="num_of_guests"
            aria-describedby="num_of_guests-error"
            {...register("num_of_guests", {
              valueAsNumber: true,
              required: "Number of guests is required",
              min: { value: 1, message: "Should be at least one guest" },
              max: {
                value: max_guests_per_booking,
                message:
                  "Should not be grater than maximum guests (in settings)",
              },
              validate: (currValue) => {
                return currValue > selectedCabinCapacity
                  ? "Should be less than selected cabin capacity "
                  : true;
              },
            })}
            aria-invalid={errors.num_of_guests ? "true" : "false"}
            className="common-input"
          />
        </FormRow>

        {/* Observations */}
        <FormRow label="Observations">
          <textarea
            id="observations"
            aria-describedby="observations-error"
            {...register("observations")}
            className="common-input"
          ></textarea>
        </FormRow>

        {/* Breakfast */}
        <FormRow
          label={`Include breakfast (For ${formatCurrency(breakfast_price)})`}
        >
          <input
            type="checkbox"
            id="has_breakfast"
            {...register("has_breakfast")}
            className="min-h-6 min-w-6 cursor-pointer rounded-lg accent-indigo-600 disabled:cursor-not-allowed"
          />
        </FormRow>

        {/* Properties set by default */}
        <input
          type="text"
          id="status"
          {...register("status")}
          value="unconfirmed"
          hidden
        />
        <input
          type="checkbox"
          id="is_paid"
          {...register("is_paid")}
          checked={false}
          hidden
        />
        <input
          type="number"
          id="extra_price"
          {...register("extra_price", { valueAsNumber: true })}
          hidden
        />
        <input
          type="date"
          id="end_date"
          {...register("end_date", { valueAsDate: true })}
          hidden
        />
        <input
          type="number"
          id="cabin_price"
          {...register("cabin_price")}
          hidden
        />
        <input
          type="number"
          id="total_price"
          {...register("total_price")}
          hidden
        />

        <div className="flex items-center justify-end gap-3 py-4">
          <Button variation="sec" type="reset">
            Cancel
          </Button>
          <Button disabled={isCreatingBooking}>
            {isCreatingBooking ? "Creating..." : "Create booking"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateNewBooking;
