import React, { useState, useEffect, useContext } from "react";

import { RiDeleteBin4Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import { GiCheckMark } from "react-icons/gi";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./CardList.css";
import API_URL from "../../../Config/GlobalUrl";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Pages/Application/UpdatePopup/UpdatePopup.css";
import { LoginContext } from "../Context/ContextProvider";

const CardList = ({ data }) => {
  const { notesList, setNotesList } = useContext(LoginContext);
  const { userId, setUserId } = useContext(LoginContext);

  // console.log(notesList);
  // console.log(userId);

  // API calling function for deleting notes

  const handleDelete = async (id) => {
    // console.log("id",id)
    try {
      if (id) {
        const response = await axios.delete(
          `${API_URL}/notes/deleteNote/${id}`
        );

        if (response.status == 200) {
          toast.info(response.data.message);
          GetNotesData(id);
          // console.log(response.data.message);
        }
        // console.log(id)
      }

      // console.log("Textarea value:", textareaValue);
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  // API calling for get all notes

  const GetNotesData = async (userId) => {
    try {
      if (userId) {
        const response = await axios.get(`${API_URL}/notes/getNotes/${userId}`);

        if (response.status == 200) {
          setNotesList(response.data.notesList);
        }
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      GetNotesData(userId);
    }, 1000);
  });

  // Update Modal (Popup) page states

  // States

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [Id, setId] = useState(null);

  // Handling changes happen in textareaValue input

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  // Handling changes happen in title input

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Function for make states empty

  const handleClear = () => {
    setTextareaValue("");
    setTitle("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (!textareaValue) {
        alert("Please provide some characters to save");
      } else if (!userId) {
        alert("Invalid User");
      } else if (!title) {
        toast.error("Please add any title to your notes");
      } else {
        const response = await axios.put(`${API_URL}/notes/updateNote`, {
          id: Id,
          notesTitle: title,
          notesData: textareaValue,
        });

        if (response.status == 200) {
          alert(response.data.message);
          handleClear();
          GetNotesData(userId);
        }
      }

      // console.log("Textarea value:", textareaValue);
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  // Function for assign values for states

  const handleOpenModal = (data) => {
    setShow(true);
    setId(data._id);
    setTextareaValue(data.notesData);
    setTitle(data.notesTitle);
    setDate(data.savedDate);
  };

  return (
    <>
      {/* Home notes listing */}
      {data.map((item, index) => (
        <div className="row" style={{ marginTop: "15px" }} key={index + 1} >
          <div className="note-list-container col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div
              className="note-list container text-center cursor"
              style={{ padding: "10px" }}
              onClick={()=>setShow(true)}
            >
              <div className="row justify-content-between">
                <div className="col-lg-4 col-md-6 col-xs-12 col-sm-12">
                  {/* Notes Title */}
                  <div className="note-list-title text-start">
                    <h5>{item.notesTitle}</h5>
                  </div>
                  {/* Notes Date & Characters */}
                  <div className="note-list-date mt-3 custom-center">
                    <h6>
                      {moment(item.savedDate).format("YYYY-MM-DD HH:mm:ss")},
                    </h6>
                    <span className="date-vertical-line"></span>
                    <h6>
                      {item.notesData.split(" ").join("").length} Characters
                    </h6>
                  </div>
                </div>
                {/* Edit & Delete Buttons */}
                <div className="col-lg-4 col-md-6 col-xs-12 col-sm-12 mt-3">
                  <div className="card-btn-cover container">
                    <div className="row justify-content-end mt-3">
                      <div className="col-4">
                        <span>
                          <RiEdit2Fill
                            className="edit-icon cursor"
                            onClick={() => handleOpenModal(item)}
                          />
                        </span>
                      </div>
                      <div className="col-4">
                        <RiDeleteBin4Fill
                          onClick={() => handleDelete(item._id)}
                          className="delete-icon cursor"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition:Bounce
          />
        </div>
      ))}

      {/* Update Modal (Popup) */}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
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
                      {/* Update Button */}
                      <div className="notes-save-icon-cover col-lg-2 col-md-2 col-sm-12 col-xs-12 custom-center">
                        <GiCheckMark onClick={handleUpdate} className="save-icon"/>
                      </div>
                    </div>
                  </div>
                  {/* Date & Character */}
                  <div className="notes-date-character custom-center">
                    <div className="notes-date-cover custom-center">
                      <h6>{moment(date).format("YYYY-MM-DD HH:mm:ss")}</h6>
                      <span className="date-vertical-line"></span>
                      <h6>
                        {textareaValue.split(" ").join("").length} Characters
                      </h6>
                    </div>
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
    </>
  );
};

export default CardList;
