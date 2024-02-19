import Button from "../../components/common/Button";

function FeatureError({ error, resetErrorBoundary }) {
  return (
    <div className="flex h-[85vh] flex-col items-center justify-center gap-6 text-balance text-center">
      <h1 className="heading-1">Oops! something went wrong.</h1>
      <p className="sec-text-color text-xl">{error.message}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export default FeatureError;
