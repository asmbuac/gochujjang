import { publicRequest } from "../requestMethods";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// export const createOrUpdateCart = async (dispatch, cart) => {
//   dispatch(cartStart());
//   try {
//     const res = await.publicRequest
//   }
// }
