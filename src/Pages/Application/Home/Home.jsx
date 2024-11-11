import React, { useState, useEffect, useContext } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import CardList from "../../../Components/CardList/CardList";
import { LoginContext } from "../../../Components/Context/ContextProvider";
import CreateNotes from "../CreatePopup/CreateModal";

const Home = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { notesList, setNotesList } = useContext(LoginContext);

  // const { loginData, setLoginData } = useContext(LoginContext);

  // console.log("loginData", loginData);
  // console.log("notesList", notesList);

  // Handling toggling operation for Search input container

  const handleSearchToggle = (e) => {
    e.preventDefault();

    setIsSearchOpen(!isSearchOpen);
  };

  // Search Filter Operation

  const [searchText, setSearchText] = useState("");

  const handleFilterChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filterData = (item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText)
    );
  };

  const filteredData = notesList.filter(filterData);

  return (
    <>
      {loginData ? (
        <>
          <div className="container">
            <div className="home-container">
              {/* Home header */}
              <div className="row">
                {/* Notes header name */}
                <div className="notes-header-cover col-lg-8 col-md-8 col-sm-2 col-xs-1">
                  <h3 className="notes-header-content">Blogs</h3>
                </div>

                {/* Create-icon-cover */}
                <div className="search-bar-btn col-lg-2 col-md-2 col-sm-2 col-xs-2 custom-center ">
                  <span className="search-btn-cover">
                    <FaSearch onClick={handleSearchToggle} />
                  </span>
                </div>
                {/* create-icon-cover */}
                <div className="create-bar-btn col-lg-2 col-md-2 col-sm-2 col-xs-2  custom-center">
                  <CreateNotes />
                </div>
              </div>

              {/* Search-bar-cover */}
              {isSearchOpen ? (
                <>
                  <div className="row">
                    <div className="search-input-cover">
                      <div className="search-bar-btn col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-3">
                        <form>
                          <div className="form-control">
                            <input
                              type="text"
                              className="input-style"
                              placeholder="Search..."
                              style={{ margin: "10px 2px" }}
                              onChange={handleFilterChange}
                              value={searchText}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {/* Notes Listing */}
              <CardList data={filteredData} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="login-navigator-container">
            <div className="login-navigator-cover">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h3 className="location-navigator-content">
                    Please kindly login for getting home page access...
                  </h3>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 button-cover mt-4">
                  <Link to="/Login" className="submit-link">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
