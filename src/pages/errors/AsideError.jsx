import Button from "../../components/common/Button";

function AsideError({ resetErrorBoundary }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="font-semibold">
        Oops! something went wrong in the sidebar.
      </p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export default AsideError;
