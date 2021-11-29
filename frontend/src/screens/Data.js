import React, { useState, useEffect } from "react";
import ShowData from "./ShowData";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { listData } from "../actions/listAction";

export default function Data() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfoo = useSelector((state) => state.data);
  const { listItems } = userInfoo;
  useEffect(() => {
    dispatch(listData());
  }, []);
  console.log(listItems)

  return (
    <div>
      {!listItems ? (
          <h1>NO DATA </h1>
      ) : (
        listItems.map((product) => <ShowData showData={product}></ShowData>)
      
      )}
    </div>
  );
}
