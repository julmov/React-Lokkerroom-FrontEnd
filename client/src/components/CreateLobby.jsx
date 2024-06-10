import React, { useState } from "react";
import "../css/CreateLobby.css";

const CreateLobby = () => {
  const [lobbyName, setLobbyName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lobbyName.trim()) {
      console.error("Error: Lobby name cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const token1 = JSON.parse(token);
      const tokenValue = token1.token;

      const response = await fetch(
        "https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/createLobby",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
          body: JSON.stringify({ lobby_name: lobbyName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create lobby");
      }

      const data = await response.json();
      console.log("Created Lobby:", data);
      alert("Lobby was successfully created")
       setLobbyName("");
      // Optionally, you can redirect or update state after successful creation
    } catch (error) {
      console.error("Error creating lobby:", error);
    }
  };

  return (
    <div className="createLobbyBox">
      <h2>Create Lobby</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={lobbyName}
          onChange={(e) => setLobbyName(e.target.value)}
          placeholder="Enter lobby name"
          className="input-lobby"
        />
        <button type="submit" className="button-create">Submit</button>
      </form>
    </div>
  );
};

export default CreateLobby;
