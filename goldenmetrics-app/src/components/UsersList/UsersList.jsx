import React, { useState } from "react";

import Alphabet from "../Alphabet/Alphabet";
import SearchBar from "../SearchBar/SearchBar";
import AllUsers from "../AllUsers/AllUsers";
import Logout from "../Logout/Logout";
import ConnectionsUser from "../ConnectionsUser/ConnectionsUser";
import UsersLetterSelected from "../UsersLetterSelected/UsersLetterSelected";
import UsersSearchInput from "../UsersSearchInput/UsersSearchInput";
import Pagination from "../Pagination/PaginationUsers";
import "./UsersList.css";

const UsersList = props => {
  const [startUser, setStartUsers] = useState(0);
  const [endUser, setEndUsers] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [letterSelected, setAlphabet] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [displayAllUsers, setDisplayAllUsers] = useState(true);
  const [userIdSelected, setUserIdSelected] = useState(false);
  const [startUserConnection, setStartUserConnection] = useState(1);

  const setStart =() => {
    setCurrentPage(1);
    setStartUsers(0);
    setEndUsers(50);
  }
  
  const letterClickedHandler = event => {
    const letterSelected = event.target.value;
    setAlphabet(letterSelected);
    setSearchInput("");
    setDisplayAllUsers(false);
    setStart();
  };

  const userSelectedHandler = event => {
    const userId = event.target.value;
    setUserIdSelected(userId);
    setStartUserConnection(1);
  };

  const searchUserHandler = event => {
    const userInput = event.target.value;
    setSearchInput(userInput);
    setAlphabet("");
    setDisplayAllUsers(false);
    setStart();
    if (userInput === "") {
      setDisplayAllUsers(true);
      setUserIdSelected(false);
    }
  };

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
        {userIdSelected && (
          <ConnectionsUser
            id={userIdSelected}
            startUserConnection={startUserConnection}
          />
        )}
        {!userIdSelected && (
          <div className="warning">
            Select a user from the list to see their connections
          </div>
        )}
      </div>
      <Pagination
        searchInput={searchInput}
        letterSelected={letterSelected}
        items={props.items}
        currentPage={currentPage}
        onHandleLoadLessUsers = {handleLoadLessUsers}
        onHandleLoadMoreUsers = {handleLoadMoreUsers}
        connectionsPerPage = {50}
      />
    </div>
  );
};

export default UsersList;
