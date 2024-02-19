import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useGetBookingById } from "./useGetBookingById";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Empty from "../../components/common/Empty";
import ErrorIndicator from "../../components/common/ErrorIndicator";
import Status from "./Status";
import BookingDataContainer from "./BookingDataContainer";
import ButtonWithIcon from "../../components/common/ButtonWithIcon";
import Modal from "../../components/common/Modal";
import ConfirmDelete from "../../components/common/ConfirmDelete";

function BookingDetails() {
  const { bookingDetails, error, isError, isLoading } = useGetBookingById();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { isCheckingOut, checkOut } = useCheckout(bookingDetails?.id);
  const { isDeleting, deleteBooking } = useDeleteBooking(bookingDetails?.id);

  // Check if data is available first
  if (isLoading) return <Loader />;
  if (isError) return <ErrorIndicator displayedError={error.message} />;
  if (!bookingDetails || bookingDetails.length === 0) return <Empty />;

  const { id: bookingId, status } = bookingDetails;

  return (
    <Modal>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-2 mb-4">Booking #{bookingId}</h1>
            <Status status={status} />
          </div>
          <ButtonWithIcon onClick={moveBack}>
            <HiOutlineArrowLeft />
            <span>Back</span>
          </ButtonWithIcon>
        </div>

        <BookingDataContainer bookingDetails={bookingDetails} />

        <div className="flex items-center justify-end gap-4">
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button onClick={checkOut} disabled={isCheckingOut}>
              Check Out
            </Button>
          )}

          <Modal.OpenButton id="delete-booking">
            <Button variation="danger">Delete booking</Button>
          </Modal.OpenButton>

          <Modal.Window id="delete-booking">
            <ConfirmDelete
              name="Booking"
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(null, {
                  onSuccess: () => {
                    navigate(-1);
                  },
                })
              }
            />
          </Modal.Window>

          <Button variation="sec" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default BookingDetails;
