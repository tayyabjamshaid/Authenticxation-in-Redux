import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import { listCreate } from "../actions/listAction";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.userSignIn);
  const { userInfo } = userData;

  const [task, newTask] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [checkBox, setCheck] = useState();
  const [attachment, setFiles] = useState("");
  const [progress, setProgress] = useState(1);

  const cont = async (e) => {
    e.preventDefault();
    dispatch(
      listCreate({
        listItems: { task, description, title, checkBox, progress, attachment },
      })
    );
  };

  const getFiles = (files) => {
    console.log(files[0].name);
    setFiles(files[0].name);
  };
  useEffect(() => {
    if (!userInfo) {
      history.push("/signin");
    }
  }, [history.push, userInfo]);

  return (
    <div className="row">
      <form className="col s12" onSubmit={(e) => cont(e)}>
        <div className="row">
          <div className="input-field col s6">
            <input
              value={title}
              id="title"
              type="text"
              className="validate"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label for="title">Title</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input
              value={task}
              id="task"
              type="text"
              className="validate"
              onChange={(e) => newTask(e.target.value)}
            />
            <label for="task">Task</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input
              value={description}
              id="Description"
              type="text"
              className="validate"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label for="Description">Description</label>
          </div>
        </div>
        <div className="row">
          <p>
            <label>
              <input
                type="radio"
                required
                onChange={(e) => setCheck(e.target.value)}
              />
              <span>1</span>
            </label>
          </p>{" "}
          <p>
            <label>
              <input
                required
                type="radio"
                onChange={(e) => setCheck(e.target.value)}
              />
              <span>2</span>
            </label>
          </p>{" "}
          <p>
            <label>
              <input
                required
                type="radio"
                onChange={(e) => setCheck(e.target.value)}
              />
              <span>3</span>
            </label>
          </p>{" "}
          <p>
            <label>
              <input
                required
                type="radio"
                onChange={(e) => setCheck(e.target.value)}
              />
              <span>4</span>
            </label>
          </p>
        </div>
        <div className="row">
          <h5>Select Attachment Files</h5>
          <FileBase64 multiple={true} onDone={(file) => getFiles(file)} />
        </div>

        <div className="row">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
