import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import BookingsTable from "../features/bookings/BookingsTable";
import BookingsTableOperations from "../features/bookings/BookingsTableOperations";
import CreateNewBooking from "../features/bookings/CreateBookingForm";

function Bookings() {
  return (
    <Modal>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <h1 className="heading-1">All Bookings</h1>
        <BookingsTableOperations />
      </div>
      <BookingsTable />

      <Modal.OpenButton id="create-booking" widthFit={true}>
        <Button> Add new booking </Button>
      </Modal.OpenButton>

      <Modal.Window
        id="create-booking"
        nameForA11y="Create a new booking modal"
      >
        <CreateNewBooking />
      </Modal.Window>
    </Modal>
  );
}

export default Bookings;
