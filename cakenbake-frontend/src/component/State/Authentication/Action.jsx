// src/redux/user/authActions.js
import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./ActionTypes";
import { API_URL } from "../../config/api";
import Swal from "sweetalert2";

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("firsttime", true);
    }

    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurants");
    } else {
      reqData.navigate("/");
    }

    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Register successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    console.log("Register Success", data);
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
    console.log("error", error);
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post(`${API_URL}/auth/signin `, reqData.userData);

    if (data.jwt) localStorage.setItem("jwt", data.jwt);

    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurants");
    } else {
      reqData.navigate("/");
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Login successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    console.log("Login Success", data);
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title:
        error.response.status == 500
          ? "user name password should not null"
          : "user name password incorrect",
      showConfirmButton: false,
      timer: 1500,
    });

    dispatch({ type: REGISTER_FAILURE, payload: error });
    console.log("error", error);
  }
};
