import React from "react";

const PaginationContacts = props => {
  let totalPagesSearch = Math.ceil(
    props.sortedConnections.length / props.connectionsPerPage
  );
  if (props.searchInput) {
    totalPagesSearch = Math.ceil(
      props.usersSearchInput.length / props.connectionsPerPage
    );
  }

  return (
    <div className="button-contacts">
      <button
        className="button"
        disabled={props.currentPage === 1}
        onClick={props.onHandleLoadLessUsers}
      >
        Less
      </button>
      <span className="pagination">
        {props.currentPage} / {totalPagesSearch}
      </span>
      <button
        className="button"
        disabled={props.currentPage >= totalPagesSearch}
        onClick={props.onHandleLoadMoreUsers}
      >
        More
      </button>
    </div>
  );
};

export default PaginationContacts;
