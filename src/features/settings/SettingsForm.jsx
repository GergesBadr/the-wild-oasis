import { useForm } from "react-hook-form";

import { useUpdateSettings } from "./useUpdateSettings";
import Button from "../../components/common/Button";
import FormRow from "../../components/common/FormRow";

function SettingsForm({ onCloseModal }) {
  const { isUpdating, updateSettings } = useUpdateSettings();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    delayError: 300,
  });
  const watchMinNights = watch("min_booking_length");

  function onSubmit(data) {
    updateSettings(data, { onSuccess: onCloseModal });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Minimum nights/booking"
        error={errors?.min_booking_length?.message}
        describedby="minimum-nights"
      >
        <input
          type="number"
          id="min_booking_length"
          aria-describedby="minimum-nights"
          {...register("min_booking_length", {
            required: "Minimum nights is required",
            min: { value: 1, message: "Minimum nights should be positive" },
            valueAsNumber: true,
          })}
          aria-invalid={errors.min_booking_length ? "true" : "false"}
          className="common-input"
        />
      </FormRow>

      <FormRow
        label="Maximum nights/booking"
        error={errors?.max_booking_length?.message}
        describedby="maximum-nights"
      >
        <input
          type="number"
          id="max_booking_length"
          aria-describedby="maximum-nights"
          {...register("max_booking_length", {
            required: "Maximum nights is required",
            min: { value: 1, message: "Maximum nights should be positive" },
            validate: (maxNightsValue) => {
              return maxNightsValue <= watchMinNights
                ? "Maximum nights should be grater than Minimum"
                : true;
            },
            valueAsNumber: true,
          })}
          aria-invalid={errors.max_booking_length ? "true" : "false"}
          className="common-input"
        />
      </FormRow>

      <FormRow
        label="Maximum guests/booking"
        error={errors?.max_guests_per_booking?.message}
        describedby="maximum-guests"
      >
        <input
          type="number"
          id="max_guests_per_booking"
          aria-describedby="maximum-guests"
          {...register("max_guests_per_booking", {
            required: "Maximum guests is required",
            min: { value: 1, message: "Maximum guests should be positive" },
          })}
          aria-invalid={errors.max_guests_per_booking ? "true" : "false"}
          className="common-input"
        />
      </FormRow>

      <FormRow
        label="Breakfast price"
        error={errors?.breakfast_price?.message}
        describedby="breakfast-price"
      >
        <input
          type="number"
          id="breakfast_price"
          aria-describedby="breakfast-price"
          {...register("breakfast_price", {
            required: "Breakfast price is required",
            min: {
              value: 10,
              message: "Breakfast price should be at least 10",
            },
          })}
          aria-invalid={errors.breakfast_price ? "true" : "false"}
          className="common-input"
        />
      </FormRow>

      <div className="flex items-center justify-end gap-3 py-4">
        <Button variation="sec" type="reset">
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
}

export default SettingsForm;
