import React from "react";
import { Button } from "../Button/Button";

import "./Modal.css";

export const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <Button text="Close" onClick={handleClose} className="btn-close" />
      </section>
    </div>
  );
};
