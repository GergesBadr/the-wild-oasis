import { createPortal } from "react-dom";
import {
  createContext,
  createElement,
  useContext,
  useRef,
  useState,
} from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import useOutsideClick from "../../hooks/useOutsideClick";
import useFocusTrap from "../../hooks/useFocusTrap";
import useCloseWithEsc from "../../hooks/useCloseWithEsc";

const ModalContext = createContext();

function Modal({ children }) {
  const [currOpenedModalId, setCurrOpenedModalId] = useState("");

  function openModal(currOpenedModalId) {
    setCurrOpenedModalId(currOpenedModalId);
  }

  function closeModal() {
    setCurrOpenedModalId("");
  }

  return (
    <ModalContext.Provider value={{ currOpenedModalId, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Window({ children, nameForA11y, id }) {
  const { currOpenedModalId, closeModal } = useContext(ModalContext);
  const modalRef = useRef(null);

  // Close modal when clicked outside
  useOutsideClick(modalRef, closeModal);
  // When modal is open, close it with escape key
  useCloseWithEsc(currOpenedModalId, closeModal);
  // Handle focus within the modal
  useFocusTrap(currOpenedModalId, "modal-window");

  if (currOpenedModalId !== id) return null;
  return createPortal(
    // Overlay
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center px-10 backdrop-blur-sm">
      {/* Modal window */}
      <div
        id="modal-window"
        ref={modalRef}
        role="dialog"
        aria-label={nameForA11y}
        className="h-auto max-h-[90%] w-full overflow-y-auto rounded-lg bg-white px-10 py-6 shadow-lg duration-200 lg:w-auto dark:bg-dark-bg "
      >
        {/* Button to close the modal */}
        <button
          aria-label="Close modal"
          onClick={closeModal}
          className="mb-6 ml-auto block rounded-lg p-1 duration-200 hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <HiOutlineXMark className="icon-size" />
        </button>

        {/*
        instead of just returning the children, I did this to be able to pass the "onCloseModal" prop to children,
        because it will be needed there, to close the modal after something happen, e.g adding and updating data
        */}
        {createElement(children.type, {
          ...children.props,
          onCloseModal: () => closeModal(),
        })}
      </div>
    </div>,
    // Put the modal as a direct child to the body
    document.body,
  );
}

function OpenButton({ children, id, widthFit }) {
  const { openModal } = useContext(ModalContext);

  // Almost the only best way I could find, even though it's not a best practise to click on a div to trigger something, it's better to just use a button.
  // But some buttons would take another action while opening the modal, for example,
  // the "update" button in cabins will fill the form with the clicked cabin data, so, it's not a good idea to return two nested buttons
  //  instead return a div that open the modal and inside it put whatever you want.
  return (
    <div className={widthFit ? "w-fit" : ""} onClick={() => openModal(id)}>
      {children}
    </div>
  );
}

Modal.Window = Window;
Modal.OpenButton = OpenButton;

export default Modal;
