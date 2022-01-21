import React from "react";
import style from "./Modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModalPassword } from "../../actions/index.js";

const Modal = () => {
  const dispatch = useDispatch();
  const showModal = () => {
    dispatch(closeModalPassword());
  };

  return (
    <div className={style.bigContainer}>
      <div className={style.modalContainer}>
        <div className={style.upperTitle}>
          <h2>Forgot your password?</h2>
          <p>Enter your email address to get reset instructions sent to you.</p>
        </div>
        <form>
          <label>
            Email
            <input
              type="email"
              required
              name="email"
              placeholder="name@domain.com"
            ></input>
          </label>
          <button>Reset Password</button>
          <p className={style.greenText} onClick={showModal}>
            Go back
          </p>
        </form>
      </div>
    </div>
  );
};

export default Modal;
