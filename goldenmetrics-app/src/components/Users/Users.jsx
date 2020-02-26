import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserProvider } from "../../shared/Context/UserContext";
import UsersList from "../UsersList/UsersList";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const user = { loadedUsers };
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios("http://localhost:5000/contacts");
      users.data.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
      });
      setLoadedUsers(users.data);
    };
    fetchUsers();
  }, []);

  return (
    <UserProvider value={user}>
      <UsersList items={loadedUsers}/>
    </UserProvider>
  );
};

export default Users;