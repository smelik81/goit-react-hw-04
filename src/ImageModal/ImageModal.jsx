import Modal from "react-modal";
import { AiFillCloseSquare } from "react-icons/ai";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function ImageModal({
  isOpen,
  closeModal,
  imageUrl,
  alt_description,
}) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={true} // Close on click outside
        shouldCloseOnEsc={true} // Close on ESC key press
        /*  overlayClassName={css.modalOverlay} */
      >
        <button className={css.buttonModalClose} onClick={() => closeModal()}>
          <AiFillCloseSquare className={css.closeSvg} />
        </button>

        <img src={imageUrl} alt={alt_description} />
      </Modal>
    </>
  );
}
