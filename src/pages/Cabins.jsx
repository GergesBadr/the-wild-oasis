import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../components/common/Button";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Modal from "../components/common/Modal";

function Cabins() {
  const [editCabin, setEditCabin] = useState({});

  function changeEditCabinValue(newValue) {
    setEditCabin(newValue);
  }

  return (
    <Modal>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <h1 className="heading-1">All Cabins</h1>
        <CabinTableOperations />
      </div>
      <CabinTable />

      <Modal.OpenButton id="create-cabin" widthFit={true}>
        <Button onClick={() => changeEditCabinValue({})}>Add new cabin</Button>
      </Modal.OpenButton>

      <Modal.Window
        id="create-cabin"
        nameForA11y="Create and update cabins modal"
      >
        <CreateCabinForm editCabin={editCabin} />
      </Modal.Window>
    </Modal>
  );
}

export default Cabins;
