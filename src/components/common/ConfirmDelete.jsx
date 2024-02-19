import Button from "./Button";

function ConfirmDelete({ name, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="space-y-4">
      <h2 className="heading-2">Delete {name}</h2>
      <p className="text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this {name} permanently? This action
        cannot be undone.
      </p>
      <div className="flex items-center justify-end gap-4">
        <Button variation="sec" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
