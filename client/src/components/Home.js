import React, { useContext } from "react";
import { UserContext } from "../context/user";

import Login from "./Login";

function Home() {
  const { user, loggedIn } = useContext(UserContext);

  if (!loggedIn) {
    return <Login />;
  } else {
    return (
      <div>
        <h3>Welcome, {user.username}.</h3>
        <p>
          Thanks for choosing us here at youTours to be your trusted site to
          getting you on your next tour.
        </p>
      </div>
    );
  }
}

export default Home;
