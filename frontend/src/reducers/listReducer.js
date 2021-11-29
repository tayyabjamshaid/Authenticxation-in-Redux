export const listReducer = (state = { listItems: [] }, action) => {
  switch (action.type) {
    case "LIST_REQ":
      return { loading: true };
    case "LIST_SUCCESS":
      return { loading: false, success: true, listItems: action.payload };
    case "LIST_REQ_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const listData = (state = { listItems: [] }, action) => {
  switch (action.type) {
    case "LIST_DATA":
      return { loading: true };
    case "LIST_DATA_SUCCESS":
      return { loading: false, success: true, listItems: action.payload };
    case "LIST_DATA_FAIL":
      return { loading: false, error: action.payload };
     
      case "DEL_DATA_SUCCESS" : 
      
      return {...state,listItems:state.listItems.filter((x)=>x._id!==action.payload)}
    case "LIST_CREATE_RESET":
      return {};
    default:
      return state;
  }
};
