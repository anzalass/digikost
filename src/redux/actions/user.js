import axios from "axios";

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get("http://localhost:8000/api/user", {
      headers,
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error,
    });
  }
};
