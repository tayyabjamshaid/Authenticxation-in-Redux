export const userReducer=(state={},action)=>{
    switch(action.type){
        case 'REQUEST_4_USERLOGIN': return{
            loading:true
        }
        case 'LOGIN_INFO':return{
            loading :false,
            userInfo:action.payload
        }
        case 'ERROR_IN_USERLOGIN':return{
   loading:false,
   error:action.payload
        }
        case "SIGN_OUT" :return {}

        default:return state
    }
}
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_REGISTER_REQUEST":
        return { loading: true };
      case "USER_REGISTER_SUCCESS":
        return { loading: false, userInfo: action.payload };
      case "USER_REGISTER_FAIL":
        return { loading: false, error: action.payload };
        
      default:
        return state;
    }
  };