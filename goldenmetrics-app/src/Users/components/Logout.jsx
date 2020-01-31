import React, {useContext} from "react";
import { AuthContext } from '../../shared/Context/AuthContext';

import './Logout.css';

const Logout = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <button className="button logout" onClick={auth.logout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
