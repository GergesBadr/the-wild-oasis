import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";
import FormRow from "../../components/common/FormRow";
import Button from "../../components/common/Button";

function SignUpForm() {
  const { pendingSignUp, signUp } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    delayError: 300,
  });
  const watchPassword = watch("password");

  function onSubmit({ full_name, email, password }) {
    signUp({ full_name, email, password }, { onSettled: () => reset() });
  }

  return (
    <div className="rounded-lg bg-white px-10 py-6 shadow-md dark:bg-dark-bg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="Full name"
          error={errors?.full_name?.message}
          describedby="full-name-error"
        >
          <input
            type="text"
            id="full_name"
            autoComplete="name"
            aria-describedby="full-name-error"
            {...register("full_name", {
              required: "Full name is required ",
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
          label="Password (min 8 characters)"
          error={errors?.password?.message}
          describedby="password-error"
        >
          <input
            type="password"
            id="password"
            aria-describedby="password-error"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
            className="common-input"
          />
        </FormRow>

        <FormRow
          label="Repeat password"
          error={errors?.password_confirm?.message}
          describedby="password_confirm-error"
        >
          <input
            type="password"
            id="password_confirm"
            aria-describedby="password_confirm-error"
            {...register("password_confirm", {
              required: "Confirmation password is required",
              validate: (password_confirm) => {
                return password_confirm !== watchPassword
                  ? "Not matched passwords"
                  : true;
              },
            })}
            aria-invalid={errors.password_confirm ? "true" : "false"}
            className="common-input"
          />
        </FormRow>

        <div className="flex items-center justify-end gap-3 py-4">
          <Button variation="sec" type="reset">
            Cancel
          </Button>
          <Button disabled={pendingSignUp}>
            {pendingSignUp ? "Creating..." : "Create new user"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
