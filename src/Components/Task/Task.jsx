import React, { useState, memo } from "react";
import clsx from "clsx";
import { Button } from "../UI/Button/Button";
import { Modal } from "../UI/Modal/Modal";

import styles from "./Task.module.css";

export const Task = memo(
  ({
    text,
    id,
    isChecked,
    onDelete,
    onCheck,
    onEdit,
    draggable,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    index,
  }) => {
    const [editValue, setEditValue] = useState(text);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isEditTask = () => {
      if (editValue !== text) {
        onEdit(editValue, id);
        handleClose();
      }
    };
    const changeEditValue = (e) => {
      setEditValue(e.target.value);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        isEditTask(editValue);
      }
    };

    return (
      <div>
        <div
          className={styles.wrapperTask}
          onDragStart={onDragStart}
          onDragLeave={onDragEnd}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDrop={onDrop}
          draggable={draggable}
        >
          <div>{index}.</div>
          <div className={clsx(styles.wrapperItem, styles.taskText)}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onCheck(id)}
            />

            <p>{text}</p>
          </div>
          <div className={styles.wrapperItem}>
            <Button
              text="Edit"
              className={styles.btnEdit}
              onClick={handleShow}
            />
            <Button
              text="Delete"
              className={styles.btnDelete}
              onClick={() => onDelete(id)}
            />
          </div>
        </div>
        <Modal handleClose={handleClose} show={show}>
          <input
            type="text"
            value={editValue}
            onChange={changeEditValue}
            style={{ width: "100%" }}
            onKeyDown={handleKeyDown}
          />
          <Button text="Ok" onClick={isEditTask} className={styles.btnOk} />
        </Modal>
      </div>
    );
  }
);
