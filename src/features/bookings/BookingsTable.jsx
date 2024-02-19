import BookingRow from "./BookingRow";
import Loader from "../../components/common/Loader";
import ErrorIndicator from "../../components/common/ErrorIndicator";
import Menus from "../../components/common/Menus";
import Empty from "../../components/common/Empty";
import Pagination from "../../components/common/Pagination";
import { useGetBookings } from "./useGetBookings";
import { bookingsItemsPerPage } from "../../utils/constants";

function BookingsTable() {
  const { data = {}, error, isError, isLoading } = useGetBookings();
  const bookings = data.data;
  const bookingsCount = data.count;

  if (isLoading) return <Loader />;
  if (isError) return <ErrorIndicator displayedError={error.message} />;
  if (!bookings || bookings.length === 0) return <Empty />;

  return (
    <Menus>
      {/*
      To make the table scrollable by the height, while keeping the head sticky:
      specify a max-h to the "div". and a position "sticky" with "top = 0" to every "th" inside the "thead".
      but I preferred to keep it like this.
      */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead className="bg-gray-100 text-left dark:bg-dark-bg dark:text-white">
            <tr className="uppercase tracking-wider [&>th:first-child]:rounded-tl-lg [&>th:last-child]:rounded-tr-lg [&>th]:p-4">
              <th>Cabin</th>
              <th>Guest</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              return <BookingRow key={booking.id} booking={booking} />;
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" className="p-4">
                <Pagination
                  totalResults={bookingsCount}
                  itemsPerPage={bookingsItemsPerPage}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Menus>
  );
}

export default BookingsTable;
