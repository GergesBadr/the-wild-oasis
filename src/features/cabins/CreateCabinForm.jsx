import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";
import Button from "../../components/common/Button";
import FormRow from "../../components/common/FormRow";

function CreateCabinForm({ editCabin, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const { id: editCabinId, ...editCabinValues } = editCabin;
  const inUpdateMode = Boolean(editCabinId);
  const isLoading = isCreating || isUpdating;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // When update a cabin, use that cabin data, when add a new one, start empty
    defaultValues: inUpdateMode ? editCabinValues : {},
    // Prevent error messages to be displayed instantly, giving better UX
    delayError: 300,
  });
  const watchRegularPrice = watch("regular_price");

  function onSubmit(data) {
    const updatedData = { editCabinId, ...data };
    inUpdateMode
      ? updateCabin(updatedData, { onSuccess: onCloseModal })
      : createCabin(
          { ...data, image: data.image[0] },
          { onSuccess: onCloseModal },
        );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Cabin name"
        error={errors?.name?.message}
        describedby="cabin-name"
      >
        <input
          type="text"
          id="name"
          aria-describedby="cabin-name"
          {...register("name", { required: "Cabin name is required" })}
          aria-invalid={errors.name ? "true" : "false"}
          className="common-input"
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.max_capacity?.message}
        describedby="maximum-capacity"
      >
        <input
          type="number"
          id="max_capacity"
          aria-describedby="maximum-capacity"
          {...register("max_capacity", {
            required: "Maximum capacity is required",
            min: {
              value: 1,
              message: "Maximum capacity should be positive",
            },
          })}
          aria-invalid={errors.max_capacity ? "true" : "false"}
          className="common-input"
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regular_price?.message}
        describedby="regular-price"
      >
        <input
          type="number"
          id="regular_price"
          aria-describedby="regular-price"
          {...register("regular_price", {
            required: "Regular price is required",
            min: { value: 1, message: "Regular price should be positive" },
            valueAsNumber: true,
          })}
          aria-invalid={errors.regular_price ? "true" : "false"}
          className="common-input"
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
        describedby="discount"
      >
        <input
          type="number"
          id="discount"
          aria-describedby="discount"
          {...register("discount", {
            validate: (discountValue) => {
              return discountValue >= watchRegularPrice
                ? "Discount should be less than regular price"
                : true;
            },
            valueAsNumber: true,
          })}
          defaultValue={0}
          aria-invalid={errors.discount ? "true" : "false"}
          className="common-input"
        />
      </FormRow>

      <FormRow
        label="Cabin description"
        error={errors?.description?.message}
        describedby="description"
      >
        <textarea
          id="description"
          aria-describedby="description"
          {...register("description", {
            required: "Cabin description  is required",
          })}
          aria-invalid={errors.description ? "true" : "false"}
          className="common-input"
        ></textarea>
      </FormRow>

      {!inUpdateMode && (
        <FormRow
          label="Cabin image"
          error={errors?.image?.message}
          describedby="cabin-image"
        >
          <input
            type="file"
            id="image"
            aria-describedby="cabin-image"
            accept="image/*"
            {...register("image", { required: "Cabin image is required" })}
          />
        </FormRow>
      )}

      <div className="flex items-center justify-end gap-3 pt-4">
        <Button variation="sec" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading && "Submitting..."}
          {!isLoading && inUpdateMode && "Edit cabin"}
          {!isLoading && !inUpdateMode && "Create cabin"}
        </Button>
      </div>
    </form>
  );
}

export default CreateCabinForm;
