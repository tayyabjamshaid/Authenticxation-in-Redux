import Axios from "axios"
export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: "USER_REGISTER_REQUEST", payload: { email, password } });
    try {
      const { data } = await Axios.post('/user/register', {
        name,
        email,
        password,
      });
      dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
      dispatch({ type: "LOGIN_INFO", payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const Login=(email,password)=>async(dispatch)=>{
    dispatch({type:"REQUEST_4_USERLOGIN",payload:{email,password}})
    try{
        const {data}=await Axios.post("/user/login",{email,password})
     dispatch({type:"LOGIN_INFO",payload:data})
     localStorage.setItem("userInfo",JSON.stringify(data))
    }catch(error){
        dispatch({
            type: "ERROR_IN_USERLOGIN",
            payload:
            //this code is for display error "Invalid Email" on screen coming from backend
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
}
export const Logout=()=>(dispatch)=>{
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems")
    localStorage.removeItem("shippingAddress")
    dispatch({type:"SIGN_OUT"})
}