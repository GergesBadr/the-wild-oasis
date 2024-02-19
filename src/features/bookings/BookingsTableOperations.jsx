import Filter from "../../components/common/Filter";
import Sort from "../../components/common/Sort";

function BookingsTableOperations() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Filter
        searchParamsField="status"
        optionsInOrder={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked In" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
        whatFor="bookings"
        paramsToBeReset={[{ name: "page", value: 1 }]}
      />
      <Sort
        optionsInOrder={[
          { value: "start_date-asc", label: "Sort by date (Oldest first)" },
          { value: "start_date-desc", label: "Sort by date (Newest first)" },
          { value: "total_price-asc", label: "Sort by amount (Low first)" },
          { value: "total_price-desc", label: "Sort by amount (High first)" },
        ]}
        whatFor="bookings"
      />
    </div>
  );
}

export default BookingsTableOperations;
