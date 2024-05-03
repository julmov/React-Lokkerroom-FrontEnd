// LobbyList.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faUser
} from "@fortawesome/free-solid-svg-icons";
const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    let token1 = JSON.parse(token);
    let tokenValue = token1.token;

    fetch("https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data); // Set the messages from the API response
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

  return (
    <div className="usersList">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.username} className="usersLi">
            {" "}
            <FontAwesomeIcon icon={faUser} className="userIcon" />
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
