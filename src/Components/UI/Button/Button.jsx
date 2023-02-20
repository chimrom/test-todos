import React from "react";
import clsx from "clsx";

import styles from "./Button.module.css";

export const Button = ({ text, className, onClick }) => {
  return (
    <div>
      <button className={clsx(styles.btn, className)} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
