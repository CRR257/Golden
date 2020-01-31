import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../shared/Context/UserContext";

import SearchBar from "./SearchBar";
import AllConnectionsUser from "./AllConnectionsUser";
import ConnectionsSearchInput from "./ConnectionsSearchInput";
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
  const [placeholder, setPlaceholder] = useState("Search...");
  
  const user = useContext(UserContext);

  useEffect(() => {
    const userSelected = user.loadedUsers.filter(
      userId => userId.id === props.id
    );
    const nameSelected = userSelected[0].name;
    const avatar = userSelected[0].avatar;
    setAvatarUser(avatar);
    setNameUserSelected(nameSelected);
    const userIdConnections = userSelected[0].connections;

    const userConnections = [];
    for (let i = 0; i < userIdConnections.length; i++) {
      if (user.loadedUsers.find(x => x.id === userIdConnections[i])) {
        userConnections.push(
          user.loadedUsers.find(x => x.id === userIdConnections[i])
        );
      }
    }
    const sortedUserConnections = userConnections.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setSortedConnections(sortedUserConnections);
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
      setPlaceholder("Search...");
    }
  };

  let totalPagesSearch = Math.ceil(sortedConnections.length / 20);
  if (searchInput) {
    totalPagesSearch = Math.ceil(usersSearchInput.length / 20);
  }

  return (
    <div className="connections">
      <div className="connections-header">
        <div className="searchbar-connections">
          <SearchBar
            onChangeHandler={searchUserHandler}
            className="searchbar-connections"
            placeholder={placeholder}
          />
        </div>
        <span className="connections-header__title">{nameUserSelected}</span>

        {
          <img
            src={avatarUser}
            alt={nameUserSelected}
            className="connections-header__image"
          />
        }
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
      <div className="button-contacts">
        <button
          className="button"
          disabled={currentPage === 1}
          onClick={handleLoadLessUsers}
        >
          Less
        </button>
        <span className="pagination">
          {currentPage} / {totalPagesSearch}
        </span>
        <button
          className="button"
          disabled={currentPage >= totalPagesSearch}
          onClick={handleLoadMoreUsers}
        >
          More
        </button>
      </div>
    </div>
  );
};

export default ConnectionsUser;
