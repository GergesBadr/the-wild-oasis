import { useForm } from "react-hook-form";
import { useGetUser } from "./useGetUser";
import { useUpdateUser } from "./useUpdateUser";
import FormRow from "../../components/common/FormRow";
import Button from "../../components/common/Button";

function UpdateUserData() {
  const { isUpdatingUser, updateUser } = useUpdateUser();
  const { user } = useGetUser();
  const currUserEmail = user?.email;
  const currUserFullname = user?.user_metadata?.full_name;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { email: currUserEmail, full_name: currUserFullname },
    delayError: 300,
  });

  function onSubmit(data) {
    const full_name = data.full_name;
    const avatar = data.avatar[0];
    updateUser(
      { full_name, avatar },
      { onSettled: () => reset({ full_name: currUserFullname }) },
    );
  }

  function handleCancel() {
    setValue("full_name", currUserFullname);
  }

  return (
    <div>
      <h2 className="heading-2 mb-6 mt-10">Update user data</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-lg bg-white p-8 shadow-md dark:bg-dark-bg"
      >
        <FormRow label="Email address">
          <input
            type="email"
            id="email"
            autoComplete="off"
            readOnly
            {...register("email")}
            className="cursor-not-allowed rounded-md bg-gray-300 px-4 py-2 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
          />
        </FormRow>

        <FormRow
          label="Full name"
          error={errors?.full_name?.message}
          describedby="full_name-error"
        >
          <input
            type="text"
            id="full_name"
            aria-describedby="full_name-error"
            {...register("full_name", {
              required: "New full name is required",
            })}
            aria-invalid={errors.full_name ? "true" : "false"}
            className="rounded-md border-2 border-gray-300 bg-transparent px-4 py-2 dark:border-gray-700"
          />
        </FormRow>

        <FormRow label="Avatar image">
          <input
            type="file"
            id="avatar"
            accept="image/*"
            {...register("avatar")}
          />
        </FormRow>

        <div className="flex justify-end gap-4">
          <Button type="button" variation="sec" onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={isUpdatingUser}>
            {isUpdatingUser ? "Updating..." : "Update account"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserData;
