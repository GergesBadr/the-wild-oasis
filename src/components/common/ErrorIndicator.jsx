function ErrorIndicator({ displayedError }) {
  return (
    <p className="text-lg font-medium capitalize text-red-700 dark:text-red-600">
      Sorry, {displayedError}
    </p>
  );
}

export default ErrorIndicator;
