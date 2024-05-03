import React, { useState, useEffect } from "react";
import "../css/MainPage.css";
import { Link } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";

import IconBox from "./IconBox";
import UsersList from "./UsersList";

import LobbyList from "./LobbyList";
import RecieveMessage from "./RecieveMessage";
import SendMessage from "./SendMessage";
import CreateLobby from "./CreateLobby";
import SettingsContent from "./SettingsContent";

const MainPage = () => {
   const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
   const [activeContent, setActiveContent] = useState("lobby");

     const updateRoomName = (name) => {
       setRoomName(name);
     };

  useEffect(() => {
   let token = localStorage.getItem("token");
   let token1 = JSON.parse(token);
   let tokenValue = token1.token;
   

    fetch(
      "https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/messages",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data); // Set the messages from the API response
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []); // Empty dependency array to run the effect only once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
      let token = localStorage.getItem("token");
      let token1 = JSON.parse(token);
      let tokenValue = token1.token;
   if (!newMessage.trim()) {
     console.error("Error: Message cannot be empty.");
     return; // Exit the function if the message is empty
   }
    try {
      const response = await fetch(
        "https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/messages/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
          body: JSON.stringify({ content: newMessage }),
        }
      );
      const data = await response.json();
      console.log(data); // Handle the response data as needed

      // Clear the input field after sending the message
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
     
    }
  };

  return (
    <div className="mainPage">
     
      <div className="boxes">
        <div className="leftBox">
          <IconBox setActiveContent={setActiveContent} />
          <div className="contentBox">
            {/* Render content based on activeContent state */}
            {activeContent === "lobby" && (
              <LobbyList updateRoomName={updateRoomName} />
            )}
            {activeContent === "receive" && <RecieveMessage />}
            {activeContent === "send" && <SendMessage />}
            {activeContent === "create" && <CreateLobby />}
            {activeContent === "settings" && <SettingsContent />}
          </div>
        </div>
        <div className="middleBox">
          <div className="roomNameBox">
            <h2 className="roomName">{roomName}</h2>
          </div>
          <div className="MessageBox">
            {/* Display messages fetched from API */}
            {messages.map((message) => (
              <div key={message.id} className="myMessages">
                {message.content}
              </div>
            ))}
          </div>
          <div className="inputBox">
            <input
              type="text"
              className="inputMessage"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            <button type="submit" className="sendButton" onClick={handleSubmit}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
        <div className="rightBox">
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
