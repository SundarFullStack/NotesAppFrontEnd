import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import { GrFormClose } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { LoginContext } from "../../../Components/Context/ContextProvider";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import "./CreatePopup.css";
import API_URL from "../../../../Config/GlobalUrl";

const CreateNotes = () => {
  // States
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [textareaValue, setTextareaValue] = useState("");
  const { userId, setUserId } = useContext(LoginContext);
  const [title, setTitle] = useState("");

  // Function for handling changes happens in textareaValue

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  // Function for handling changes happens in title

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Function for make all states empty

  const handleClear = () => {
    setTextareaValue("");
    setTitle("");
  };

  // API caller for save notes data

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!textareaValue) {
        alert("Please provide some characters to save");
      } else if (!userId) {
        alert("Invalid User");
      } else if (!title) {
        alert("Please add any title to your notes");
      } else {
        const response = await axios.post(`${API_URL}/notes/createNote`, {
          id: userId,
          notesTitle: title,
          notesData: textareaValue,
        });

        if (response.status == 200) {
          alert(response.data.message);
          handleClear();
        }
      }

      // console.log("Textarea value:", textareaValue);
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  return (
    <div>
      {/*For open popup*/}
      <span className="search-btn-cover">
        <FaPlus onClick={handleShow} />
      </span>
      {/* Create Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {/* Close Icon */}
          <GrFormClose onClick={handleClose} className="popup-close-btn" />
          <div className="popup-container">
            <div className="row custom-center">
              <div className="popup-notes-card col-lg-12 col-md-12 col-xs-12 col-sm-12">
                {/* Title & Save button */}
                <div className="notes-title-input-cover">
                  <div className="row">
                    {/* Title */}
                    <div className="col-lg-10 col-md-10 col-xs-12 col-sm-12">
                      <input
                        placeholder="Add Your Title"
                        onChange={handleTitleChange}
                        className="input-style"
                        type="text"
                        style={{ fontWeight: "600" }}
                        value={title}
                      />
                    </div>
                    {/* Save Button */}
                    <div className="notes-save-icon-cover col-lg-2 col-md-2 col-sm-12 col-xs-12 custom-center">
                      <GiCheckMark onClick={handleSubmit} className="save-icon"/>
                    </div>
                  </div>
                </div>
                {/* Date & Character */}
                <div className="notes-date-character custom-center">
                  <div className="notes-date-cover custom-center">
                    <h6>{moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}</h6>
                    <span className="date-vertical-line"></span>
                    <h6>
                      {textareaValue.split(" ").join("").length} Characters
                    </h6>
                  </div>
                  <div className="notes-character-cover"></div>
                </div>
                {/* Notes Input */}
                <div className="notes-input-box">
                  <textarea
                    value={textareaValue}
                    onChange={handleTextareaChange}
                    placeholder="Type your notes here..."
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateNotes;
