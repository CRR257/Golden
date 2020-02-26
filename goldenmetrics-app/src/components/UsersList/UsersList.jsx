import React, { useState } from "react";

import Alphabet from "../Alphabet/Alphabet";
import SearchBar from "../SearchBar/SearchBar";
import AllUsers from "../AllUsers/AllUsers";
import Logout from "../Logout/Logout";
import ConnectionsUser from "../ConnectionsUser/ConnectionsUser";
import UsersLetterSelected from "../UsersLetterSelected/UsersLetterSelected";
import UsersSearchInput from "../UsersSearchInput/UsersSearchInput";
import "./UsersList.css";

const UsersList = props => {
  const [startUser, setStartUsers] = useState(0);
  const [endUser, setEndUsers] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [letterSelected, setAlphabet] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [displayAllUsers, setDisplayAllUsers] = useState(true);
  const [userIdSelected, setUserIdSelected] = useState(false);
  const [placeholder, setPlaceholder] = useState("Search...");

  const letterClickedHandler = event => {
    const letterSelected = event.target.value;
    setAlphabet(letterSelected);
    setSearchInput("");
    setDisplayAllUsers(false);
    setCurrentPage(1);
    setStartUsers(0);
    setEndUsers(50);
  };

  const userSelectedHandler = event => {
    const userId = event.target.value;
    setUserIdSelected(userId);
  };

  const searchUserHandler = event => {
    const userInput = event.target.value;
    setSearchInput(userInput);
    setAlphabet("");
    setDisplayAllUsers(false);
    setCurrentPage(1);
    setStartUsers(0);
    setEndUsers(50);
    if (userInput === "") {
      setDisplayAllUsers(true);
      setUserIdSelected(false);
      setPlaceholder("Search...");
    }
  };

  let totalPages = Math.ceil(props.items.length / 50);
  if (letterSelected) {
    const usersLetterSelected = props.items.filter(user => {
      return user.name.indexOf(letterSelected) === 0;
    });
    totalPages = Math.ceil(usersLetterSelected.length / 50);
  } else if (searchInput) {
    const usersSearchInput = props.items.filter(user => {
      return user.name.toLowerCase().indexOf(searchInput.toLowerCase()) === 0;
    });
    totalPages = Math.ceil(usersSearchInput.length / 50);
  }

  const handleLoadMoreUsers = () => {
    setCurrentPage(currentPage + 1);
    setStartUsers(startUser + 50);
    setEndUsers(endUser + 50);
  };

  const handleLoadLessUsers = () => {
    setCurrentPage(currentPage - 1);
    setStartUsers(startUser - 50);
    setEndUsers(endUser - 50);
  };

  return (
    <div className="container">
      <Logout />
      <SearchBar
        onChangeHandler={searchUserHandler}
        placeholder={placeholder}
      />
      <div className="users-content">
        <Alphabet onClickHandler={letterClickedHandler} className="alphabet" />
        {!letterSelected && !searchInput && displayAllUsers && (
          <AllUsers
            onUserClickHandler={userSelectedHandler}
            startUser={startUser}
            endUser={endUser}
          />
        )}
        {letterSelected && !searchInput && !displayAllUsers && (
          <UsersLetterSelected
            letterSelected={letterSelected}
            onUserClickHandler={userSelectedHandler}
            startUser={startUser}
            endUser={endUser}
          />
        )}
        {!letterSelected && searchInput && !displayAllUsers && (
          <UsersSearchInput
            searchInput={searchInput}
            onUserClickHandler={userSelectedHandler}
            startUser={startUser}
            endUser={endUser}
          />
        )}
      </div>
      <div className="button-users">
        <button
          className="button"
          disabled={currentPage === 1}
          onClick={handleLoadLessUsers}
        >
          Less
        </button>
        <span className="pagination">
          {currentPage} / {totalPages}
        </span>
        <button
          className="button"
          disabled={currentPage >= totalPages}
          onClick={handleLoadMoreUsers}
        >
          More
        </button>
        {userIdSelected && <ConnectionsUser id={userIdSelected} />}
      </div>
    </div>
  );
};

export default UsersList;
