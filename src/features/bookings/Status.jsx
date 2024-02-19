function Status({ status }) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-sm font-medium uppercase tracking-wide ${
        status === "unconfirmed" ? "bg-sky-800 text-sky-200" : ""
      } ${status === "checked-in" ? "bg-green-800 text-green-200" : ""} ${
        status === "checked-out" ? "bg-gray-700 text-gray-200" : ""
      } `}
    >
      {status}
    </span>
  );
}

export default Status;
