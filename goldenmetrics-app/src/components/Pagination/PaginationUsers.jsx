import React from "react";

const PaginationUsers = props => {
  let totalPages = Math.ceil(props.items.length / 50);
  if (props.letterSelected) {
    const usersLetterSelected = props.items.filter(user => {
      return user.name.indexOf(props.letterSelected) === 0;
    });
    totalPages = Math.ceil(
      usersLetterSelected.length / props.connectionsPerPage
    );
  } else if (props.searchInput) {
    const usersSearchInput = props.items.filter(user => {
      return (
        user.name.toLowerCase().indexOf(props.searchInput.toLowerCase()) === 0
      );
    });
    totalPages = Math.ceil(usersSearchInput.length / props.connectionsPerPage);
  }

  return (
    <div className="button-users">
      <button
        className="button"
        disabled={props.currentPage === 1}
        onClick={props.onHandleLoadLessUsers}
      >
        Less
      </button>
      <span className="pagination">
        {props.currentPage} / {totalPages}
      </span>
      <button
        className="button"
        disabled={props.currentPage >= totalPages}
        onClick={props.onHandleLoadMoreUsers}
      >
        More
      </button>
    </div>
  );
};

export default PaginationUsers;
