import React, { useContext } from "react";
import UserContext from "../../shared/Context/UserContext";

const UsersLetterSelected = props => {
  const user = useContext(UserContext);

  const usersLetterSelected = user.loadedUsers.filter(u => {
    return u.name.indexOf(props.letterSelected) === 0;
  });

  return (
    <ul>
      {usersLetterSelected
        .slice(props.startUser, props.endUser)
        .map(userSelected => (
          <li
            key={userSelected.id}
            value={userSelected.id}
            onClick={props.onUserClickHandler}
          >
            {userSelected.name}
          </li>
        ))}
    </ul>
  );
};

export default UsersLetterSelected;
