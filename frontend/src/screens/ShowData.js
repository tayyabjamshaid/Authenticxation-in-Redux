import React from "react";

import {  useDispatch } from "react-redux";
import { deleteData } from "../actions/listAction";
export default function ShowData({ showData }) {
  const dispatch = useDispatch();
  const deleteMe=(id)=>{
 
    dispatch(deleteData(id))
  }
  return (
    <div>
      {showData.listItems.map((data) => {
        return (
          <div>
            <h5>Task : {data.task}</h5>
            <h5>Description : {data.description}</h5>
            <h5>Title : {data.title}</h5>
            <button onClick={()=>deleteMe(data._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
