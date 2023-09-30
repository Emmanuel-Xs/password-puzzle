/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import Modal from "../UI/Modal";

import { handleReload } from "../../utils/randoms";

const ConfirmModal = ({ isCorrect }) => {
  const [openModal, setOpenModal] = useState(false);
  let content = "";

  useEffect(() => {
    if (isCorrect === "true") {
      setOpenModal(true);
    }
    if (isCorrect === "false") {
      setOpenModal(true);
    }
  }, [isCorrect]);

  if (isCorrect === "true") {
    content = "You got the anwer right!";
  }
  if (isCorrect === "false") {
    content = "You got the wrong answer, try again or try another one";
  }

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <p>{content}</p>
      <div>
        {isCorrect === "false" ? (
          <button onClick={() => setOpenModal(false)}>Cancel</button>
        ) : (
          ""
        )}
        <button onClick={handleReload}>Reload</button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
