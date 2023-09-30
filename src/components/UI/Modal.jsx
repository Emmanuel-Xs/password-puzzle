/* eslint-disable react/prop-types */
import { useRef, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { clearIsCorrect } from "../../app/store";

import classes from "./modal.module.css";

const Modal = ({ children, open, onClose }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const dialogRef = ref.current;

  useLayoutEffect(() => {
    const closeListenerFn = () => {
      if (onClose) {
        onClose();
        dispatch(clearIsCorrect());
      }
    };
    dialogRef?.addEventListener("close", closeListenerFn);

    return () => {
      dialogRef?.addEventListener("close", closeListenerFn);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    if (open && !dialogRef?.open) {
      dialogRef.showModal();
    } else if (!open && dialogRef?.open) {
      dialogRef?.close();
      dispatch(clearIsCorrect());
    }
  }, [open]);

  const closeWithOutside = (e) => {
    const dialogDiamension = e.currentTarget.getBoundingClientRect();

    if (
      e.clientX < dialogDiamension.left ||
      e.clientX > dialogDiamension.right ||
      e.clientY < dialogDiamension.top ||
      e.clientY > dialogDiamension.bottom
    ) {
      e.currentTarget.close();
    }
  };
  return (
    <dialog
      ref={ref}
      className={classes.modalContainer}
      onClick={closeWithOutside}
    >
      {children}
    </dialog>
  );
};

export default Modal;
