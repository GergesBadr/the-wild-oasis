import { useForm } from "react-hook-form";
import { useCreateGuest } from "./useCreateGuest";
import { getCountryFlag } from "../../utils/helpers";
import FormRow from "../../components/common/FormRow";
import Button from "../../components/common/Button";

function CreateGuestForm() {
  const { isCreating, createGuest } = useCreateGuest();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    delayError: 300,
  });

  function onSubmit(data) {
    // Get country flag from nationality
    const countryFlag = getCountryFlag(data.nationality);
    data.country_flag = !countryFlag
      ? ""
      : `https://flagcdn.com/${countryFlag}.svg`;

    // Submit the data
    createGuest(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <div className="space-y-4 rounded-lg bg-white px-10 py-6 shadow-lg dark:bg-dark-bg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="Full name"
          error={errors?.full_name?.message}
          describedby="full_name-error"
        >
          <input
            type="text"
            id="full_name"
            autoComplete="name"
            aria-describedby="full_name-error"
            {...register("full_name", {
              required: "Full name is required",
              minLength: {
                value: 6,
                message: "Full name should be at least 6 characters",
              },
            })}
            aria-invalid={errors.full_name ? "true" : "false"}
            className="common-input"
          />
        </FormRow>

        <FormRow
          label="Email address"
          error={errors?.email?.message}
          describedby="email-error"
        >
          <input
            type="email"
            id="email"
            autoComplete="email"
            aria-describedby="email-error"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Not valid email" },
            })}
            aria-invalid={errors.email ? "true" : "false"}
            className="common-input"
          />
        </FormRow>

        <FormRow
          label="Country name (Nationality)"
          error={errors?.nationality?.message}
          describedby="nationality-error"
        >
          <input
            type="text"
            id="nationality"
            aria-describedby="nationality-error"
            {...register("nationality", {
              required: "Nationality is required",
            })}
            aria-invalid={errors.nationality ? "true" : "false"}
            className="common-input"
          />
        </FormRow>

        <FormRow
          label="National id"
          error={errors?.national_id?.message}
          describedby="national_id-error"
        >
          <input
            type="number"
            id="national_id"
            aria-describedby="national_id-error"
            {...register("national_id", {
              required: "National id is required",
            })}
            aria-invalid={errors.national_id ? "true" : "false"}
            className="common-input"
          />
        </FormRow>

        {/* Country flag */}
        <input
          type="text"
          id="country_flag"
          {...register("country_flag")}
          hidden
        />

        <div className="flex items-center justify-end gap-3 py-4">
          <Button variation="sec" type="reset">
            Cancel
          </Button>
          <Button disabled={isCreating}>
            {isCreating ? "Creating…" : "Add new guest"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateGuestForm;
