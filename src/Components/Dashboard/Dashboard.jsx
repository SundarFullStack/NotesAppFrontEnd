import React, { useState } from "react";
import "./dashboard.css";

import { useNavigate } from "react-router-dom";

import ImageChanger from "../ImageChanger/ImageChanger";

import NoteImage from "../../Images/NoteImage.png";
import NoteImage1 from "../../Images/NoteImage1.png";
import NoteImage2 from "../../Images/NoteImage2.png";
import NoteImage3 from "../../Images/NoteImage3.png";
import NoteImage4 from "../../Images/NoteImage4.png";
import NoteImage5 from "../../Images/NoteImage5.png";
import NoteImage6 from "../../Images/NoteImage6.png";
import NoteImage7 from "../../Images/NoteImage7.png";
import NoteImage9 from "../../Images/NoteImage9.png";

const Dashboard = () => {
  // Images containing list
  const [images, setImages] = useState([
    NoteImage,
    NoteImage1,
    NoteImage2,
    NoteImage3,
    NoteImage4,
    NoteImage5,
    NoteImage6,
    NoteImage7,
    NoteImage9,
  ]);
  const navigator = useNavigate();

  // Function for handling get started button event

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigator("/home");
  };

  return (
    <>
      <div className="dash-container-cover custom-center">
        <div className="dash-container col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <p className="content-header custom-center">
                {" "}
                If you can't explain it simply, you don't understand it well
                enough
              </p>
              <p className="content">
                - A blog, short for weblog, is a frequently updated web page
                used for personal commentary or business content.
              </p>
              <div className="getStarted-btn-cover">
                <button className="getStarted-btn" onClick={handleGetStarted}>
                  Get Started
                </button>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <ImageChanger images={images} className="dash-picture" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
