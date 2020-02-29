import React, { useContext } from "react";
import UserContext from "../../shared/Context/UserContext";

const UsersSearchInput = props => {
  const user = useContext(UserContext);
  const displayUsersSearchInput = () => {
    const usersSearchInput = user.loadedUsers.filter(user => {
      return (
        user.name.toLowerCase().indexOf(props.searchInput.toLowerCase()) === 0
      );
    });
    return (
      <ul className="allUsers">
        {usersSearchInput.length === 0 ? (
          <p>Not users found</p>
        ) : (
          usersSearchInput
            .slice(props.startUser, props.endUser)
            .map(userSelected => (
              <li
                key={userSelected.id}
                value={userSelected.id}
                onClick={props.onUserClickHandler}
              >
                {userSelected.name}
              </li>
            ))
        )}
      </ul>
    );
  };
  return <div>{displayUsersSearchInput()}</div>;
};

export default UsersSearchInput;
