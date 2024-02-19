import {
  HiOutlineSquare2Stack,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Menus from "../../components/common/Menus";
import Modal from "../../components/common/Modal";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";

function CabinRow({ cabin }) {
  const { name, max_capacity, regular_price, description, discount, image } =
    cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();

  // Duplicate a cabin by creating a new cabin with the same data
  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicateCabin() {
    createCabin({
      name,
      max_capacity,
      regular_price,
      description,
      discount,
      image,
    });
  }

  return (
    <tr className="border-b border-b-gray-300 font-sono duration-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-dark-bg [&>td]:p-4">
      <td>
        <img
          src={image}
          alt={`Cabin ${name}.`}
          loading="lazy"
          className="h-16 w-16 scale-125 rounded-md object-cover"
        />
      </td>
      <td className="text-balance">{name}</td>
      <td>Fits up to {max_capacity} guests</td>
      <td className="font-medium"> {formatCurrency(regular_price)} </td>
      <td
        className={
          discount > 0 ? "font-medium text-green-700 dark:text-green-500" : ""
        }
      >
        {formatCurrency(discount) || <span>&mdash;</span>}
      </td>
      {/* Actions with context menu, and modals, I know, it's a bit confusing! */}
      <td>
        <Modal>
          <Menus.Menu>
            <Menus.Trigger label="Toggle actions menu" id={cabin.id} />

            <Menus.Content id={cabin.id}>
              {/*
            I should make this buttons accessible, in terms of keyboard navigation,
            when the "Content" is opened, focus should be on first foucusable element inside it.
            when it's closed, focus should go back to first foucusable element outside it.
            but I didn't find a way to achieve it (I didn't search enough)
            */}

              <Menus.Button
                icon={<HiOutlineSquare2Stack className="icon-size" />}
                onClick={handleDuplicateCabin}
                ariaLabel={`Duplicate ${name} cabin`}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              {/* Open a modal to update cabin */}
              <Modal.OpenButton id="update-cabin">
                <Menus.Button
                  icon={<HiOutlinePencil className="icon-size" />}
                  ariaLabel={`Update ${name} cabin`}
                  extraClasses="w-full"
                >
                  Update
                </Menus.Button>
              </Modal.OpenButton>

              {/* Open a modal to confirm deleting a cabin */}
              <Modal.OpenButton id="delete-cabin">
                <Menus.Button
                  icon={<HiOutlineTrash className="icon-size" />}
                  ariaLabel={`Delete ${name} cabin`}
                  extraClasses="w-full"
                >
                  Delete
                </Menus.Button>
              </Modal.OpenButton>
            </Menus.Content>
          </Menus.Menu>

          {/* This should be outside the "Menus" */}
          <Modal.Window nameForA11y="Update cabin modal" id="update-cabin">
            <CreateCabinForm editCabin={cabin} />
          </Modal.Window>

          <Modal.Window nameForA11y="Delete cabin modal" id="delete-cabin">
            <ConfirmDelete
              name="Cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabin)}
            />
          </Modal.Window>
        </Modal>
      </td>
    </tr>
  );
}

export default CabinRow;
