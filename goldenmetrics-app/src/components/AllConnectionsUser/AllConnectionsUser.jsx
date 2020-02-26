import React from "react";

const AllConnectionsUser = props => {
  return (
    <div>
      <ul className="connections-user">
        {props.sortedConnections
          .slice(props.startUser, props.endUser)
          .map(item => (
            <li key={item.name} className="connection-user">
              <img
                src={item.avatar}
                alt={item.name}
                className="connection-user__image"
              />
              <span className="connection-user__name">{item.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AllConnectionsUser;
