import React, { useContext } from "react";
import UserContext from "../../../shared/Context/UserContext";

import "./AllUsers.css";

const AllUsers = props => {
  const user = useContext(UserContext);

  return (
    <div className="container-allusers">
      <ul>
        {user.loadedUsers.slice(props.startUser, props.endUser).map(u => (
          <li key={u.id} value={u.id} onClick={props.onUserClickHandler}>
            {u.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
