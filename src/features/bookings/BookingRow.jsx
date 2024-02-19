import {
  HiOutlineArrowDownOnSquare,
  HiOutlineArrowUpOnSquare,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi2";
import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Status from "../bookings/Status";
import Menus from "../../components/common/Menus";
import Modal from "../../components/common/Modal";
import ConfirmDelete from "../../components/common/ConfirmDelete";

function BookingRow({ booking }) {
  const navigate = useNavigate();

  const {
    id: bookingId,
    start_date,
    end_date,
    num_of_nights,
    status,
    total_price,
    cabins: { name: cabinName },
    guests: { full_name: guestName, email: guestEmail },
  } = booking;

  const { isCheckingOut, checkOut } = useCheckout(bookingId);
  const { isDeleting, deleteBooking } = useDeleteBooking(bookingId);

  return (
    <tr className="border-b border-b-gray-300 font-sono duration-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-dark-bg [&>td]:p-4">
      <td className="font-semibold tracking-wider">{cabinName}</td>
      <td>
        <div className="flex flex-col gap-1">
          <p className="font-medium">{guestName}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {guestEmail}
          </p>
        </div>
      </td>
      <td>
        <div className="flex flex-col gap-1">
          <p className="font-medium">
            {/* Calculate when the booking begin */}
            <span>
              {isToday(start_date)
                ? "Today"
                : formatDistanceFromNow(start_date)}
            </span>
            <span> &mdash; </span>
            <span>
              {num_of_nights} {num_of_nights === 1 ? "night" : "nights"} stay
            </span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span> {format(new Date(start_date), "MMM dd yyyy")} </span>
            <span> &mdash; </span>
            <span> {format(new Date(end_date), "MMM dd yyyy")} </span>
          </p>
        </div>
      </td>
      <td className="text-nowrap">
        <Status status={status} />
      </td>
      <td> {formatCurrency(total_price)} </td>
      <td>
        <Modal>
          <Menus.Menu>
            <Menus.Trigger label="Toggle actions menu" id={bookingId} />

            <Menus.Content id={bookingId}>
              <Menus.Button
                icon={<HiOutlineEye className="icon-size dark:text-gray-400" />}
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                See details
              </Menus.Button>

              {status === "unconfirmed" && (
                <Menus.Button
                  icon={
                    <HiOutlineArrowDownOnSquare className="icon-size dark:text-gray-400" />
                  }
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  Check in
                </Menus.Button>
              )}

              {status === "checked-in" && (
                <Menus.Button
                  icon={
                    <HiOutlineArrowUpOnSquare className="icon-size dark:text-gray-400" />
                  }
                  onClick={checkOut}
                  disabled={isCheckingOut}
                >
                  Check out
                </Menus.Button>
              )}

              <Modal.OpenButton id="delete-booking">
                <Menus.Button
                  icon={
                    <HiOutlineTrash className="icon-size dark:text-gray-400" />
                  }
                >
                  Delete booking
                </Menus.Button>
              </Modal.OpenButton>
            </Menus.Content>
          </Menus.Menu>

          {/* Again, this need to be outside "Menus" */}
          <Modal.Window nameForA11y="Delete booking modal" id="delete-booking">
            <ConfirmDelete
              onConfirm={deleteBooking}
              disabled={isDeleting}
              name="Booking"
            />
          </Modal.Window>
        </Modal>
      </td>
    </tr>
  );
}

export default BookingRow;
