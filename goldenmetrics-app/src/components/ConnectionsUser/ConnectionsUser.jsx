import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../shared/Context/UserContext";

import SearchBar from "../SearchBar/SearchBar";
import AllConnectionsUser from "../AllConnectionsUser/AllConnectionsUser";
import ConnectionsSearchInput from "../ConnectionsSearchInput/ConnectionsSearchInput";
import Pagination from "../Pagination/PaginationContacts";
import connectionsUserLogic from "./ConnectionsUserLogic";
import "./ConnectionsUser.css";

const ConnectionsUser = props => {
  const [startUser, setStartUsers] = useState(0);
  const [endUser, setEndUsers] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedConnections, setSortedConnections] = useState([]);
  const [nameUserSelected, setNameUserSelected] = useState("");
  const [avatarUser, setAvatarUser] = useState("");
  const [searchInput, setSearchInput] = useState();
  const [usersSearchInput, setUsersSearchInput] = useState([]);

  const user = useContext(UserContext);
  
  useEffect(() => {
    const usersLoaded = user.loadedUsers;
    const userSelected = connectionsUserLogic(usersLoaded, props.id);
    setAvatarUser(userSelected.avatar);
    setNameUserSelected(userSelected.nameSelected);
    setSortedConnections(userSelected.sortedUserConnections);
  }, [props.id, user.loadedUsers]);

  if (!user.loadedUsers) {
    return (
      <div>
        <h2>No connections found</h2>
      </div>
    );
  }

  const handleLoadMoreUsers = () => {
    setCurrentPage(currentPage + 1);
    setStartUsers(startUser + 20);
    setEndUsers(endUser + 20);
  };

  const handleLoadLessUsers = () => {
    setCurrentPage(currentPage - 1);
    setStartUsers(startUser - 20);
    setEndUsers(endUser - 20);
  };

  const searchUserHandler = event => {
    const userInput = event.target.value;
    const usersSearch = sortedConnections.filter(user => {
      return user.name.toLowerCase().indexOf(userInput.toLowerCase()) === 0;
    });
    setUsersSearchInput(usersSearch);
    setSearchInput(true);
    setCurrentPage(1);
    setStartUsers(0);
    setEndUsers(20);
    if (userInput === "") {
      setSearchInput("");
    }
  };

  return (
    <div className="connections">
      <div className="connections-header">
        <div className="searchbar-connections">
          <SearchBar
            onChangeHandler={searchUserHandler}
            className="searchbar-connections"
          />
        </div>
        <span className="connections-header__title">{nameUserSelected}</span>
        <img
          src={avatarUser}
          alt={nameUserSelected}
          className="connections-header__image"
        />
      </div>
      {!searchInput && (
        <AllConnectionsUser
          sortedConnections={sortedConnections}
          startUser={startUser}
          endUser={endUser}
        />
      )}
      {searchInput && (
        <ConnectionsSearchInput
          usersSearchInput={usersSearchInput}
          startUser={startUser}
          endUser={endUser}
        />
      )}
      <Pagination
        searchInput={searchInput}
        currentPage={currentPage}
        usersSearchInput={usersSearchInput}
        sortedConnections={sortedConnections}
        onHandleLoadLessUsers={handleLoadLessUsers}
        onHandleLoadMoreUsers={handleLoadMoreUsers}
        connectionsPerPage={20}
      />
    </div>
  );
};

export default ConnectionsUser;
