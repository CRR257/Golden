import React from "react";

const ConnectionsSearchInput = props => {
    
  return (
    <div>
      <ul className="connections-user">
        {props.usersSearchInput
          .slice(props.startUser, props.endUser)
          .map(itemSearch => (
            <li key={itemSearch.name} className="connection-user">
              <img
                src={itemSearch.avatar}
                alt={itemSearch.name}
                className="connection-user__image"
              />
              <span className="connection-user__name">{itemSearch.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ConnectionsSearchInput;
