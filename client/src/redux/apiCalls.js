import { publicRequest } from "../requestMethods";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";
import { updateCart } from "./cartSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    const carRes = await publicRequest.get(`/carts/${res.data._id}`, {
      headers: {
        token: `Bearer ${res.data.token}`,
      },
    });
    if (carRes.data) {
      const cartItems = carRes.data.products.map(({ product, quantity }) => ({
        ...product,
        quantity,
      }));
      dispatch(updateCart(cartItems));
    }
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
