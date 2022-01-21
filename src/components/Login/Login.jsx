import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import Logo from "../../assets/img/logo.png";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal.jsx";
import { openModalPassword } from "../../actions/index.js";

let socket = new WebSocket(
  "ws://stream.tradingeconomics.com/?client=guest:guest"
);
const objInfo = JSON.stringify({ topic: "subscribe", to: "EURUSD:CUR" });

const Login = () => {
  // Websocket
  const [wsInfo, setWsInfo] = useState(null);

  useEffect(() => {
    let isMounted = true;
    socket.onopen = () => {
      console.log("WebSocket Client Connected");
      socket.send(objInfo);
    };
    socket.onmessage = (e) => {
      const response = JSON.parse(e.data);
      console.log(e.data);
      if (isMounted) setWsInfo(response);
    };

    return () => {
      isMounted = false;
      console.log("WebSocket Client Disconnected");
      socket.close();
    };
  }, []);

  // Modal
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.modalIsOpen);

  // Controlled form
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (!input.email || !input.password) return;
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", input);
      return response;
    } catch (error) {
      const response = false;
      console.log(error);
      return response;
    }
  };

  const showModal = () => {
    dispatch(openModalPassword());
  };
  return (
    <div className={style.bigContainer}>
      <div className={style.formContainer}>
        <div className={style.imgContainer}>
          <img src={Logo} alt="Ortex" />
        </div>

        <div className={openModal ? style.hideForm : style.formContainer__text}>
          <h1>Log in.</h1>
          <p>Welcome back! Please login to your account!</p>
        </div>
        <form className={openModal && style.hideForm} onSubmit={handleSubmit}>
          <label>
            <p>Your e-mail</p>
            <input
              placeholder="name@domain.com"
              type="email"
              name="email"
              autocomplete="off"
              onChange={handleInputChange}
            ></input>
          </label>
          <label>
            <p>Password</p>
            <input
              placeholder="*****"
              type="password"
              name="password"
              autocomplete="off"
              onChange={handleInputChange}
            ></input>
          </label>
          <button className={style.btnLogIn}>Log in</button>
          <button className={style.btnGoogle}>
            <FcGoogle className={style.btnGoogle__icon} />
            Sign in with Google
          </button>
          <div className={style.extraNav}>
            <p>
              Don't have an account?{" "}
              <span className={style.greenText}>Sign up</span>
            </p>
            <p className={style.greenText} onClick={showModal}>
              Forgot password?
            </p>
          </div>
        </form>
        <div className={style.cotizationContainer}>
          <p className={style.cotization}>
            EUR/USD {wsInfo && wsInfo.price}
            <br></br>
            CURRENT TIME: {wsInfo && `${new Date(wsInfo.dt)}`}
          </p>
        </div>
      </div>
      {openModal && <Modal />}
      <aside className={style.aside}></aside>
    </div>
  );
};

export default Login;
