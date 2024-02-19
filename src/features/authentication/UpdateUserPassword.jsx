import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import FormRow from "../../components/common/FormRow";
import Button from "../../components/common/Button";

function UpdateUserPassword() {
  const { isUpdatingUser, updateUser } = useUpdateUser();

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    delayError: 300,
  });
  const watchPassword = watch("password");

  function onSubmit(data) {
    const password = data.password;
    updateUser({ password }, { onSettled: () => reset() });
  }

  return (
    <div>
      <h2 className="heading-2 mb-6 mt-10">Update password</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-lg bg-white p-8 shadow-md dark:bg-dark-bg"
      >
        <FormRow
          label="New password (min 8 chars)"
          error={errors?.password?.message}
          describedby="password-error"
        >
          <input
            type="password"
            id="password"
            aria-describedby="password-error"
            {...register("password", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 chars",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
            className="rounded-md border-2 border-gray-300 bg-transparent px-4 py-2 dark:border-gray-700"
          />
        </FormRow>

        <FormRow
          label="Confirm password"
          error={errors?.password_confirm?.message}
          describedby="password_confirm-error"
        >
          <input
            type="password"
            id="password_confirm"
            aria-describedby="password_confirm-error"
            {...register("password_confirm", {
              required: "Password confirmation is required",
              validate: (password_confirm) => {
                return password_confirm !== watchPassword
                  ? "Passwords must match"
                  : true;
              },
            })}
            aria-invalid={errors.password_confirm ? "true" : "false"}
            className="rounded-md border-2 border-gray-300 bg-transparent px-4 py-2 dark:border-gray-700"
          />
        </FormRow>

        <div className="flex justify-end gap-4">
          <Button variation="sec" type="reset">
            Cancel
          </Button>
          <Button disabled={isUpdatingUser}>
            {isUpdatingUser ? "Updating..." : "Update password"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserPassword;
