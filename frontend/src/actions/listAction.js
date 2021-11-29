import Axios from "axios";
export const listCreate = (listItems) => async (dispatch, getState) => {
  dispatch({ type: "LIST_REQ", payload: listItems });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    console.log(listItems);
    console.log(userInfo.token);
    const { data } = await Axios.post("/list", listItems, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: "LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "LIST_REQ_FAIL",
      payload: error.response ? error.response.data.message : error.response,
    });
  }
};
export const listData = () => async (dispatch, getState) => {
  dispatch({ type: "LIST_DATA" });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();

    const { data } = await Axios.get("/list", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: "LIST_DATA_SUCCESS", payload: data });
    localStorage.setItem("listData", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "LIST_DATA_FAIL",
      payload: error.response ? error.response.data.message : error.response,
    });
  }
};
export const deleteData = (id) => async (dispatch, getState) => {
 

    const {
      userSignIn: { userInfo },
    } = getState();

    const  data  = await Axios.delete(`/list/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: "DEL_DATA_SUCCESS", payload: id });
    localStorage.setItem("listData", JSON.stringify(getState().data.listItems));
   
  
};
