import React, { useState, useEffect } from "react";

const LobbyList = ({ updateRoomName }) => {
  const [lobbies, setLobbies] = useState([]);

  const handleLobbyClick = (lobby) => {
    updateRoomName(lobby.lobby_name); // Update room name when lobby is clicked
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let token1 = JSON.parse(token);
    let tokenValue = token1.token;

    fetch(
      "https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/lobbynames",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch lobbies");
        }
        return response.json();
      })
      .then((data) => {
        setLobbies(data); // Set the lobbies from the API response
      })
      .catch((error) => {
        console.error("Error fetching lobbies:", error);
      });
  }, []);

  return (
    <div className="lobbyList">
      <h2>Lobbies</h2>
      <ul>
        {lobbies.map((lobby) => (
          <li key={lobby.id} onClick={() => handleLobbyClick(lobby)}>
            {lobby.lobby_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LobbyList;
