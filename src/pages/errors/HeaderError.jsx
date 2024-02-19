import Button from "../../components/common/Button";

function HeaderError({ resetErrorBoundary }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-lg font-semibold">
        Oops! something went wrong in the header.
      </p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export default HeaderError;
